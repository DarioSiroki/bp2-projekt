package main

import (
    "github.com/kataras/iris/v12"
    "myapp/controllers"
)


/*
kreiraj korisnika - ako postoji auth pogledaj dal taj majmun sme
organizacija - kreiraj i obrisi
projekt - kreiraj i obrisi
komentar - kreiraj i obrisi
zadatak - kreiraj i obrisi
privitak - kreiraj
*/

type Test struct {
    idtest    int
    testcol  string
}

func main() {
    app := iris.New()


    app.Listen(":8081")
}
