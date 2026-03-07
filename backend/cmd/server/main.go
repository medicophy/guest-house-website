package main

import (
	"log"

	routes "github.com/medicophy/guest-house-website/backend"
)

func main() {
	r := routes.SetupRouter()
	log.Println("Backend running at http://localhost:5000")
	if err := r.Run(":5000"); err != nil {
		log.Fatal(err)
	}
}
