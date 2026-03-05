package config

import (
	"log"
	"os"
)

func GetConfig() {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Fatal("DATABASE_URL not set")
	}
}
