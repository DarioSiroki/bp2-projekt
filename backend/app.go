package main

import (
	"github.com/gin-gonic/gin"
)

/*
kreiraj korisnika
organizacija - kreiraj i obrisi
projekt - kreiraj i obrisi
komentar - kreiraj i obrisi
zadatak - kreiraj i obrisi
privitak - kreiraj
*/

func main() {
	r := gin.Default()
	initRoutes(r)
	r.Run(":8081")
}
