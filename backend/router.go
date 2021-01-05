package main

import (
	"fmt"
	"time"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

var identityKey = "korisnik_id"

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func initRoutes(r *gin.Engine) {
	r.Use(CORSMiddleware())

	authMiddleware, err := jwt.New(&jwt.GinJWTMiddleware{
		Realm:       "test zone",
		Key:         []byte("secret key"),
		Timeout:     time.Hour * 24 * 365,
		MaxRefresh:  time.Hour,
		IdentityKey: identityKey,
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if v, ok := data.(*Korisnik); ok {
				return jwt.MapClaims{
					identityKey: v.KorisnikId,
				}
			}
			return jwt.MapClaims{}
		},
		IdentityHandler: func(c *gin.Context) interface{} {
			claims := jwt.ExtractClaims(c)
			return &Korisnik{
				KorisnikId: claims["korisnik_id"].(string),
			}
		},
		Authenticator: func(c *gin.Context) (interface{}, error) {
			var k Korisnik
			c.BindJSON(&k)
			l := k.Lozinka
			db := db_cursor()
			res, err := db.Query("SELECT korisnik_id, lozinka FROM korisnik WHERE email=?", k.Email)
			if err != nil {
				return nil, jwt.ErrFailedAuthentication
			} else {
				for res.Next() {
					res.Scan(&k.KorisnikId, &k.Lozinka)
				}
			}
			err = bcrypt.CompareHashAndPassword([]byte(k.Lozinka), []byte(l))
			if err != nil {
				return nil, jwt.ErrFailedAuthentication
			} else {
				return &Korisnik{
					KorisnikId: k.KorisnikId,
				}, nil
			}
		},
		Authorizator: func(data interface{}, c *gin.Context) bool {
			return true
		},
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.JSON(code, gin.H{
				"code":    code,
				"message": message,
			})
		},
		// TokenLookup is a string in the form of "<source>:<name>" that is used
		// to extract token from the request.
		// Optional. Default value "header:Authorization".
		// Possible values:
		// - "header:<name>"
		// - "query:<name>"
		// - "cookie:<name>"
		// - "param:<name>"
		TokenLookup: "header: Authorization",
		// TokenLookup: "query:token",
		// TokenLookup: "cookie:token",

		// TokenHeadName is a string in the header. Default value is "Bearer"
		TokenHeadName: "Bearer",

		// TimeFunc provides the current time. You can override it to use another time value. This is useful for testing or if your server uses a different time zone than your tokens.
		TimeFunc: time.Now,
	})

	if err != nil {
		fmt.Println("JWT Error:" + err.Error())
	}

	errInit := authMiddleware.MiddlewareInit()

	if errInit != nil {
		fmt.Println("authMiddleware.MiddlewareInit() Error:" + errInit.Error())
	}

	r.POST("/users/list", get_users)
	r.POST("/users/register", create_user)
	r.POST("/users/registerFromMember", authMiddleware.MiddlewareFunc(), create_by_member)
	r.POST("/users/login", authMiddleware.LoginHandler)

	r.GET("/organizations/list", authMiddleware.MiddlewareFunc(), get_organizations)
	r.POST("/organizations/create", authMiddleware.MiddlewareFunc(), create_organization)
	r.POST("/organizations/delete", authMiddleware.MiddlewareFunc(), delete_organization)
	r.POST("/organizations/update", authMiddleware.MiddlewareFunc(), update_organization)

	r.POST("/projects/list", authMiddleware.MiddlewareFunc(), get_projects)
	r.POST("/projects/create", authMiddleware.MiddlewareFunc(), create_project)
	r.POST("/projects/delete", authMiddleware.MiddlewareFunc(), delete_project)
	r.POST("/projects/update", authMiddleware.MiddlewareFunc(), update_project)

	r.POST("/tasks/list", authMiddleware.MiddlewareFunc(), get_tasks)
	r.POST("/tasks/create", authMiddleware.MiddlewareFunc(), create_task)
	r.POST("/tasks/delete", authMiddleware.MiddlewareFunc(), delete_task)
	r.POST("/tasks/update", authMiddleware.MiddlewareFunc(), update_task)
	r.POST("/tasks/assign", authMiddleware.MiddlewareFunc(), assign_task)
	r.POST("/tasks/addAttachment", authMiddleware.MiddlewareFunc(), add_attachment)
	r.POST("/tasks/getAttachments", authMiddleware.MiddlewareFunc(), get_attachments)
	r.POST("/tasks/getComments", authMiddleware.MiddlewareFunc(), get_comments)
	r.POST("/tasks/addComment", authMiddleware.MiddlewareFunc(), create_comment)

	r.GET("/statuses", authMiddleware.MiddlewareFunc(), get_statuses)
	r.POST("/statuses/set", authMiddleware.MiddlewareFunc(), change_status)

	r.GET("/priorities", authMiddleware.MiddlewareFunc(), get_priorities)
	r.POST("/priorities/set", authMiddleware.MiddlewareFunc(), set_priority)

	r.GET("/permissions", authMiddleware.MiddlewareFunc(), get_permissions)

	r.NoRoute(authMiddleware.MiddlewareFunc(), func(c *gin.Context) {
		claims := jwt.ExtractClaims(c)
		fmt.Printf("NoRoute claims: %#v\n", claims)
		c.JSON(404, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
	})
}
