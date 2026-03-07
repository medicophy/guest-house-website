// internal/database/db.go
package database

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
)

var Pool *pgxpool.Pool

func Connect(url string) {
	var err error
	Pool, err = pgxpool.New(context.Background(), url)
	if err != nil {
		log.Fatal("Unable to connect to database:", err)
	}
	log.Println("Database connected")
}
