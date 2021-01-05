package main

import (
	"fmt"
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

func get_attachments(c *gin.Context) {
	var p Privitak
	c.BindJSON(&p)
	db := db_cursor()
	results, err := db.Query("SELECT privitak_id, naziv, putanja, zadatak_id FROM privitak WHERE zadatak_id=?", p.ZadatakId)
	if err != nil {
		panic(err.Error())
	}

	privitci := Privitci{}
	for results.Next() {
		p := Privitak{}
		err = results.Scan(&p.PrivitakId, &p.Naziv, &p.Putanja, &p.ZadatakId)
		if err != nil {
			panic(err.Error())
		}
		privitci.AddItem(p)
	}
	c.JSON(200, privitci.Items)
}

func create_task(c *gin.Context) {
	user, _ := c.Get(identityKey)
	var z Zadatak
	c.BindJSON(&z)
	z.KreatorId = user.(*Korisnik).KorisnikId
	db := db_cursor()
	stmt, err := db.Prepare("INSERT INTO zadatak(instrukcije, status_id, prioritet_id, kreator_id, projekt_id, organizacija_id) VALUES(?, ?, ?, ?, ?, ?)")
	if err != nil {
		log.Panic(err)
	}
	res, err := stmt.Exec(z.Instrukcije, 1, z.PrioritetId, z.KreatorId, z.ProjektId, z.OrganizacijaId)
	if err != nil {
		log.Panic(err)
	}
	returnId, _ := res.LastInsertId()
	if err != nil {
		log.Panic(err)
		c.JSON(500, "Internal server error")
	} else {
		c.JSON(200, returnId)
	}
}

func get_tasks(c *gin.Context) {
	user, _ := c.Get(identityKey)
	var z Zadatak
	c.BindJSON(&z)
	db := db_cursor()
	results, err := db.Query("SELECT z.zadatak_id, z.instrukcije, z.kreirano, z.azurirano, s.naziv, z.projekt_id, z.organizacija_id, k.nadimak, p.naziv "+
		"FROM dodijeljen d "+
		"JOIN zadatak z on z.zadatak_id=d.zadatak_id "+
		"JOIN status s on s.status_id=z.status_id "+
		"JOIN prioritet p on p.prioritet_id=z.prioritet_id "+
		"JOIN korisnik k on z.kreator_id=k.korisnik_id "+
		"WHERE (d.korisnik_id=? OR z.kreator_id=?) AND z.organizacija_id=? AND z.projekt_id=?;",
		user.(*Korisnik).KorisnikId, user.(*Korisnik).KorisnikId, z.OrganizacijaId, z.ProjektId)
	if err != nil {
		panic(err.Error())
	}

	zadaci := Zadaci{}
	for results.Next() {
		z := Zadatak{}
		err = results.Scan(&z.ZadatakId, &z.Instrukcije, &z.Kreirano, &z.Azurirano, &z.StatusId, &z.ProjektId, &z.OrganizacijaId, &z.KreatorId, &z.PrioritetId)
		if err != nil {
			panic(err.Error())
		}
		zadaci.AddItem(z)
	}
	c.JSON(200, zadaci.Items)
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
	_, err := db.Query("DELETE FROM zadatak WHERE zadatak_id=?", z.ZadatakId)
	if err != nil {
		log.Panic(err)
		c.JSON(500, "Internal server error")
	} else {
		c.JSON(200, z)
	}
}

func change_status(c *gin.Context) {
	z := Zadatak{}
	c.BindJSON(&z)
	db := db_cursor()
	_, err := db.Query("UPDATE zadatak SET status_id=? WHERE zadatak_id=?", z.StatusId, z.ZadatakId)
	if err != nil {
		fmt.Println(err)
		c.JSON(500, "")
	} else {
		c.JSON(204, "")
	}
}

func set_priority(c *gin.Context) {
	z := Zadatak{}
	c.BindJSON(&z)
	db := db_cursor()
	_, err := db.Query("UPDATE zadatak SET prioritet_id=? WHERE zadatak_id=?", z.PrioritetId, z.ZadatakId)
	if err != nil {
		fmt.Println(err)
		c.JSON(500, "")
	} else {
		c.JSON(204, "")
	}
}
