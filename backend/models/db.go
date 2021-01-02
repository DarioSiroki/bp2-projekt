package db

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"time"
)


func db_cursor() {
	db, err := sql.Open("mysql", "root:password@tcp(baza_podataka:3306)/test")
	if err != nil {
        panic(err)
	}
	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)
	return db
}