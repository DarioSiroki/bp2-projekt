package main

import (
	"github.com/gin-gonic/gin"
)

func get_permissions(c *gin.Context) {
	db := db_cursor()
	results, err := db.Query("SELECT * FROM privilegija")
	if err != nil {
		panic(err.Error())
	}

	dopustenja := Privilegije{}
	for results.Next() {
		p := Privilegija{}
		err = results.Scan(&p.PrivilegijaId, &p.Naziv, &p.Opis)
		if err != nil {
			panic(err.Error())
		}
		dopustenja.AddItem(p)
	}
	c.JSON(200, dopustenja.Items)
}

type SetPermissions struct {
	KorisnikId     string   `json:"korisnik_id"`
	Permissions    []string `json:"dopustenja"`
	OrganizacijaId string   `json:"organizacija_id"`
}

func set_permissions(c *gin.Context) {
	var perms SetPermissions
	db := db_cursor()
	c.BindJSON(&perms)
	for p := range perms.Permissions {
		db.Query("INSERT INTO dopustenje (korisnik_id, privilegija_id, organizacija_id) VALUES()",
			perms.KorisnikId, p, perms.OrganizacijaId)
	}
	c.JSON(204, "")
}
