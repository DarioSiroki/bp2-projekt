package main

import (
	"log"

	"github.com/gin-gonic/gin"
)

func create_project(c *gin.Context) {
	user, _ := c.Get(identityKey)
	var p Projekt
	c.BindJSON(&p)
	p.KreatorId = user.(*Korisnik).KorisnikId
	db := db_cursor()
	_, err := db.Query("INSERT INTO projekt(naziv, opis, organizacija_id, kreator_id) VALUES(?, ?, ?, ?)",
		p.Naziv, p.Opis, p.OrganizacijaId, p.KreatorId)
	if err != nil {
		log.Panic(err)
		c.JSON(500, "Internal server error")
	} else {
		c.JSON(200, p)
	}
}

func get_projects(c *gin.Context) {
	var p Projekt
	c.BindJSON(&p)

	db := db_cursor()
	results, err := db.Query("SELECT projekt_id, naziv, opis, organizacija_id, kreator_id FROM projekt WHERE organizacija_id=?", p.OrganizacijaId)
	if err != nil {
		panic(err.Error())
	}

	projekti := Projekti{}
	for results.Next() {
		p := Projekt{}
		err = results.Scan(&p.ProjektId, &p.Naziv, &p.Opis, &p.OrganizacijaId, &p.KreatorId)
		if err != nil {
			panic(err.Error())
		}
		projekti.AddItem(p)
	}
	c.JSON(200, projekti.Items)
}

func update_project(c *gin.Context) {
	var p Projekt
	c.BindJSON(&p)

	db := db_cursor()
	_, err := db.Query("UPDATE projekt SET naziv=?, opis=? WHERE projekt_id=?",
		p.Naziv, p.Opis, p.ProjektId)
	if err != nil {
		log.Panic(err)
		c.JSON(500, "Internal server error")
	} else {
		c.JSON(200, p)
	}
}

func delete_project(c *gin.Context) {
	user, _ := c.Get(identityKey)
	var p Projekt
	c.BindJSON(&p)
	p.KreatorId = user.(*Korisnik).KorisnikId
	db := db_cursor()
	_, err := db.Query("DELETE FROM projekt WHERE kreator_id=? AND projekt_id=?",
		p.KreatorId, p.ProjektId)
	if err != nil {
		log.Panic(err)
		c.JSON(500, "Internal server error")
	} else {
		c.JSON(200, p)
	}
}
