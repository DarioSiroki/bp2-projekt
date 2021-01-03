package main

import (
	"github.com/gin-gonic/gin"
	"log"
)

func create_organization(c *gin.Context) {
	user, _ := c.Get(identityKey)
	var o Organizacija
	c.BindJSON(&o)
	o.KreatorId = user.(*Korisnik).KorisnikId
	db := db_cursor()
	_, err := db.Query("INSERT INTO organizacija(naziv, slika_url, kreator_id) VALUES(?, ?, ?)",
		o.Naziv, o.SlikaUrl, o.KreatorId)
	if err != nil {
		log.Panic(err)
		c.JSON(500, "Internal server error")
	} else {
		c.JSON(200, o)
	}
}

func get_organizations(c *gin.Context) {
	user, _ := c.Get(identityKey)

	db := db_cursor()
	results, err := db.Query("SELECT * FROM organizacija WHERE kreator_id=?", user.(*Korisnik).KorisnikId)
	if err != nil {
		panic(err.Error())
	}

	organizacije := Organizacije{}
	for results.Next() {
		o := Organizacija{}
		err = results.Scan(&o.OrganizacijaId, &o.Naziv, &o.SlikaUrl, &o.Kreirano, &o.KreatorId)
		if err != nil {
			panic(err.Error())
		}
		organizacije.AddItem(o)
	}
	c.JSON(200, organizacije.Items)
}

func update_organization(c *gin.Context) {
	user, _ := c.Get(identityKey)
	var o Organizacija
	c.BindJSON(&o)
	o.KreatorId = user.(*Korisnik).KorisnikId
	db := db_cursor()
	_, err := db.Query("UPDATE organizacija SET naziv=? WHERE organizacija_id=?",
		o.Naziv, o.OrganizacijaId)
	if err != nil {
		log.Panic(err)
		c.JSON(500, "Internal server error")
	} else {
		c.JSON(200, o)
	}
}

func delete_organization(c *gin.Context) {
	user, _ := c.Get(identityKey)
	var o Organizacija
	c.BindJSON(&o)
	o.KreatorId = user.(*Korisnik).KorisnikId
	db := db_cursor()
	_, err := db.Query("DELETE FROM organizacija WHERE kreator_id=? AND organizacija_id=?",
		o.KreatorId, o.OrganizacijaId)
	if err != nil {
		log.Panic(err)
		c.JSON(500, "Internal server error")
	} else {
		c.JSON(200, o)
	}
}
