package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Room represents a hotel room
type Room struct {
	ID            int    `json:"id"`
	Name          string `json:"name"`
	Description   string `json:"description"`
	PricePerNight int    `json:"price_per_night"`
	MaxGuests     int    `json:"max_guests"`
}

// dummy data for now
var rooms = []Room{
	{1, "Deluxe Suite", "Spacious suite with sea view", 150, 2},
	{2, "Standard Room", "Cozy room with queen bed", 80, 2},
	{3, "Family Room", "Large room for family of 4", 120, 4},
}

// GetRooms handles GET /rooms
func GetRooms(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*") // enable CORS
	c.JSON(http.StatusOK, rooms)
}

// SetupRouter sets up Gin routes
func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.GET("/rooms", GetRooms)
	return r
}
