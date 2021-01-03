package main

import (
	"fmt"
	"time"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

var identityKey = "korisnik_id"

func initRoutes(r *gin.Engine) {

	authMiddleware, err := jwt.New(&jwt.GinJWTMiddleware{
		Realm:       "test zone",
		Key:         []byte("secret key"),
		Timeout:     time.Hour,
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

	r.GET("/users/list", get_users)
	r.POST("/users/register", create_user)
	r.POST("/users/login", authMiddleware.LoginHandler)

	r.NoRoute(authMiddleware.MiddlewareFunc(), func(c *gin.Context) {
		claims := jwt.ExtractClaims(c)
		fmt.Printf("NoRoute claims: %#v\n", claims)
		c.JSON(404, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
	})
}
