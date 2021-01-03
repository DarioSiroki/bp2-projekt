package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func create_user(c *gin.Context) {
	var k Korisnik
	c.BindJSON(&k)
	res, err := bcrypt.GenerateFromPassword([]byte(k.Lozinka), bcrypt.DefaultCost)
	k.Lozinka = string(res)
	db := db_cursor()
	_, err = db.Query("INSERT INTO korisnik(ime, prezime, nadimak, email, lozinka, slika_url) VALUES(?, ?, ?, ?, ?, ?)",
		k.Ime, k.Prezime, k.Nadimak, k.Email, k.Lozinka, k.SlikaUrl)
	if err != nil {
		log.Panic(err)
		c.JSON(500, "Internal server error")
	} else {
		c.JSON(200, k)
	}
}

func get_users(c *gin.Context) {
	db := db_cursor()
	results, err := db.Query("SELECT ime, email, lozinka FROM korisnik")
	if err != nil {
		panic(err.Error())
	}

	korisnici := Korisnici{}
	for results.Next() {
		k := Korisnik{}
		err = results.Scan(&k.Ime, &k.Email, &k.Lozinka)
		if err != nil {
			panic(err.Error())
		}
		korisnici.AddItem(k)
	}
	c.JSON(200, korisnici.Items)

}
