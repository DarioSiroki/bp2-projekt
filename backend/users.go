package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func create_user(c *gin.Context) {
	var k Korisnik
	c.BindJSON(&k)
	res, err := bcrypt.GenerateFromPassword([]byte(k.Lozinka), bcrypt.DefaultCost)
	k.Lozinka = string(res)
	fmt.Println(k.Lozinka)
	db := db_cursor()
	_, err = db.Query(fmt.Sprintf("INSERT INTO korisnik(ime, prezime, nadimak, email, lozinka, slika_url) VALUES('%s', '%s', '%s', '%s', '%s', '%s')",
		k.Ime, k.Prezime, k.Nadimak, k.Email, k.Lozinka, k.SlikaUrl))
	if err != nil {
		log.Panic(err)
		c.JSON(500, "Internal server error")
	} else {
		c.JSON(200, k)
	}
}

func login_user(c *gin.Context) {
	var k Korisnik
	c.BindJSON(&k)
	var l string
	db := db_cursor()
	res, err := db.Query("SELECT lozinka FROM korisnik WHERE korisnik_id=?", k.KorisnikId)
	if err != nil {
		log.Println(err)
	} else {
		res.Scan(&l)
	}
	err = bcrypt.CompareHashAndPassword([]byte(l), []byte(k.Lozinka))
	if err != nil {
		c.JSON(403, "Unauthorized")
		return
	}
	c.JSON(200, k)
}

func get_users(c *gin.Context) {
	db := db_cursor()
	// Execute the query
	results, err := db.Query("SELECT ime, email, lozinka FROM korisnik")
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}

	for results.Next() {
		var k Korisnik
		err = results.Scan(&k.Ime, &k.Email, &k.Lozinka)
		if err != nil {
			panic(err.Error())
		}
		c.JSON(200, k)
	}

}
