package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func create_comment(c *gin.Context) {
	var k Komentar
	c.BindJSON(&k)
	user, _ := c.Get(identityKey)

	db := db_cursor()
	_, err := db.Query("INSERT INTO komentar(tekst, korisnik_id, zadatak_id) VALUES(?, ?, ?)",
		k.Tekst, user.(*Korisnik).KorisnikId, k.ZadatakId)

	if err != nil {
		c.JSON(500, "")
	} else {
		c.JSON(204, "")
	}
}

func get_comments(c *gin.Context) {
	var k Komentar
	c.BindJSON(&k)
	db := db_cursor()
	res, err := db.Query("SELECT kom.komentar_id, kom.tekst, kom.kreiran, kor.nadimak, kom.zadatak_id "+
		"FROM task_manager.komentar kom "+
		"JOIN task_manager.korisnik kor ON kor.korisnik_id=kom.korisnik_id "+
		"WHERE kom.zadatak_id=?", k.ZadatakId)
	if err != nil {
		fmt.Println(err)
		c.JSON(500, "")
		return
	}

	komentari := Komentari{}
	for res.Next() {
		k := Komentar{}
		res.Scan(&k.KomentarId, &k.Tekst, &k.Kreiran, &k.KorisnikId, &k.ZadatakId)
		komentari.AddItem(k)
	}
	c.JSON(200, komentari.Items)
}
