package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"golang.org/x/crypto/bcrypt"
)

// BindJSON is a shortcut for c.BindWith(obj, binding.JSON)
func BindJSON(obj interface{}, c *gin.Context) error {
	return BindWith(obj, binding.JSON, c)
}

// BindWith binds the passed struct pointer using the specified binding engine.
// See the binding package.
func BindWith(obj interface{}, b binding.Binding, c *gin.Context) error {
	if err := b.Bind(c.Request, obj); err != nil {
		//c.AbortWithError(400, err).SetType(ErrorTypeBind)
		return err
	}
	return nil
}

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

func create_by_member(c *gin.Context) {
	var k Korisnik

	c.BindJSON(&k)
	res, err := bcrypt.GenerateFromPassword([]byte(k.Lozinka), bcrypt.DefaultCost)
	k.Lozinka = string(res)
	db := db_cursor()
	_, err = db.Query("INSERT INTO korisnik(ime, prezime, nadimak, email, lozinka, slika_url) VALUES(?, ?, ?, ?, ?, ?)",
		k.Ime, k.Prezime, k.Nadimak, k.Email, k.Lozinka, k.SlikaUrl)
	q, err := db.Query("SELECT korisnik_id FROM korisnik WHERE ime=? AND prezime=? AND nadimak=? AND email=? AND lozinka=? AND slika_url=?",
		k.Ime, k.Prezime, k.Nadimak, k.Email, k.Lozinka, k.SlikaUrl)
	var k_id string
	if err != nil {
		fmt.Println("a")
		log.Panic(err)
		c.JSON(500, "Internal server error")
		return
	} else {
		korisnici := Korisnici{}
		for q.Next() {
			k := Korisnik{}
			err = q.Scan(&k.KorisnikId)
			if err != nil {
				panic(err.Error())
			}
			korisnici.AddItem(k)
			k_id = k.KorisnikId
		}
	}
	_, err = db.Query("INSERT INTO pripada(korisnik_id, organizacija_id) VALUES(?, ?)",
		k_id, k.OrganizacijaId)
	if err != nil {
		fmt.Println(err)
	}
	c.JSON(200, k_id)
}

func get_users(c *gin.Context) {
	var k Korisnik
	c.BindJSON(&k)
	db := db_cursor()
	results, err := db.Query(
		"SELECT k.korisnik_id, ime, prezime, nadimak, email, slika_url "+
			"FROM task_manager.pripada p "+
			"JOIN task_manager.korisnik k on p.korisnik_id=k.korisnik_id "+
			"WHERE p.organizacija_id=?;", k.OrganizacijaId)
	if err != nil {
		panic(err.Error())
	}

	korisnici := Korisnici{}
	for results.Next() {
		k := Korisnik{}
		err = results.Scan(&k.KorisnikId, &k.Ime, &k.Prezime, &k.Nadimak, &k.Email, &k.SlikaUrl)
		if err != nil {
			panic(err.Error())
		}
		fmt.Println(k.Ime)
		korisnici.AddItem(k)
	}
	c.JSON(200, korisnici.Items)

}
