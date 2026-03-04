package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/medicophy/guest-house-website/backend/internal/database"
)

func main() {
	database.Connect()
	r := gin.Default()

	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
		})
	})

	log.Println("Server running on :8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
