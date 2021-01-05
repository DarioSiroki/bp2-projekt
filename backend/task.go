package main

import (
	"log"

	"github.com/gin-gonic/gin"
)

func get_statuses(c *gin.Context) {
	db := db_cursor()
	results, err := db.Query("SELECT status_id, naziv, opis FROM status")
	if err != nil {
		panic(err.Error())
	}

	statuses := Statusi{}
	for results.Next() {
		s := Status{}
		err = results.Scan(&s.StatusId, &s.Naziv, &s.Opis)
		if err != nil {
			panic(err.Error())
		}
		statuses.AddItem(s)
	}
	c.JSON(200, statuses.Items)
}

func get_priorities(c *gin.Context) {
	db := db_cursor()
	results, err := db.Query("SELECT prioritet_id, naziv FROM prioritet")
	if err != nil {
		panic(err.Error())
	}

	prioriteti := Prioriteti{}
	for results.Next() {
		p := Prioritet{}
		err = results.Scan(&p.PrioritetId, &p.Naziv)
		if err != nil {
			panic(err.Error())
		}
		prioriteti.AddItem(p)
	}
	c.JSON(200, prioriteti.Items)
}

type Assignees struct {
	TaskId    int      `json:"taskId"`
	Assignees []string `json:"selectedUsers"`
}

func assign_task(c *gin.Context) {
	var assignees Assignees
	c.BindJSON(&assignees)
	db := db_cursor()
	for _, a := range assignees.Assignees {
		_, err := db.Query("INSERT INTO dodijeljen(korisnik_id, zadatak_id) VALUES(?, ?)", a, assignees.TaskId)
		if err != nil {
			c.JSON(500, "")
			return
		}
	}
	c.JSON(204, "")
}

func add_attachment(c *gin.Context) {
	var p Privitak
	c.BindJSON(&p)
	db := db_cursor()
	_, err := db.Query("INSERT INTO privitak(naziv, putanja, zadatak_id) VALUES(?, ?, ?)", p.Naziv, p.Putanja, p.ZadatakId)
	if err != nil {
		log.Fatal(err)
		c.JSON(500, "")
		return
	}
	c.JSON(204, "")
}

func create_task(c *gin.Context) {
	user, _ := c.Get(identityKey)
	var z Zadatak
	c.BindJSON(&z)
	z.KreatorId = user.(*Korisnik).KorisnikId
	db := db_cursor()
	stmt, err := db.Prepare("INSERT INTO zadatak(instrukcije, status_id, prioritet_id, kreator_id, projekt_id, organizacija_id) VALUES(?, ?, ?, ?, ?, ?)")
	res, err := stmt.Exec(z.Instrukcije, 1, z.PrioritetId, z.KreatorId, z.ProjektId, z.OrganizacijaId)
	returnId, _ := res.LastInsertId()
	if err != nil {
		log.Panic(err)
		c.JSON(500, "Internal server error")
	} else {
		c.JSON(200, returnId)
	}
}

func get_tasks(c *gin.Context) {
	var z Zadatak
	c.BindJSON(&z)
	c.JSON(200, nil)
	// db := db_cursor()
	// results, err := db.Query("SELECT projekt_id, naziv, opis, organizacija_id, kreator_id FROM projekt WHERE organizacija_id=?", z.OrganizacijaId)
	// if err != nil {
	// 	panic(err.Error())
	// }

	// zadaci := Zadaci{}
	// for results.Next() {
	// 	z := Zadatak{}
	// 	err = results.Scan(&z.ProjektId)
	// 	if err != nil {
	// 		panic(err.Error())
	// 	}
	// 	zadaci.AddItem(z)
	// }
	// c.JSON(200, zadaci.Items)
}

func update_task(c *gin.Context) {
	var z Zadatak
	c.BindJSON(&z)

	db := db_cursor()
	_, err := db.Query("UPDATE zadatak SET instrukcije=? WHERE zadatak_id=?",
		z.Instrukcije, z.ZadatakId)
	if err != nil {
		log.Panic(err)
		c.JSON(500, "Internal server error")
	} else {
		c.JSON(200, z)
	}
}

func delete_task(c *gin.Context) {
	var z Zadatak
	c.BindJSON(&z)
	db := db_cursor()
	_, err := db.Query("DELETE FROM zadatak WHERE projekt_id=?", z.ProjektId)
	if err != nil {
		log.Panic(err)
		c.JSON(500, "Internal server error")
	} else {
		c.JSON(200, z)
	}
}
