package main

import (
	"database/sql"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

func db_cursor() *sql.DB {
	db, err := sql.Open("mysql", "root:password@tcp(baza_podataka:3306)/task_manager")
	if err != nil {
		panic(err)
	}
	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)
	return db
}
