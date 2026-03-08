package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var db *sql.DB

func main() {
	// Load environment variables
	if err := godotenv.Load("../.env"); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	// Connect to PostgreSQL
	dbURL := os.Getenv("DATABASE_URL")
	var err error
	db, err = sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Check connection
	if err = db.Ping(); err != nil {
		log.Fatal("Could not connect to database:", err)
	}
	fmt.Println("Connected to guest_house_web database")

	// Initialize Router
	r := chi.NewRouter()
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5500"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// API Routes
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})
	r.Get("/api/rooms", getRooms)
	r.Get("/api/rooms/{id}", getRoomByID)

	// Set Port to 5000
	port := "5000"

	fmt.Printf("Server starting on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}

func getRooms(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT id, name, description, price_per_night, capacity, image_url, created_at FROM rooms")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var rooms []Room
	for rows.Next() {
		var rm Room
		err := rows.Scan(&rm.ID, &rm.Name, &rm.Description, &rm.PricePerNight, &rm.Capacity, &rm.ImageURL, &rm.CreatedAt)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		rooms = append(rooms, rm)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rooms)
}
func getRoomByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")               // chi uses "id" because we defined {id} in the route
	fmt.Println("Fetching room with ID:", id) // Add this line to debug in your terminal
	var rm Room

	err := db.QueryRow("SELECT id, name, description, price_per_night, capacity, image_url, created_at FROM rooms WHERE id = $1", id).
		Scan(&rm.ID, &rm.Name, &rm.Description, &rm.PricePerNight, &rm.Capacity, &rm.ImageURL, &rm.CreatedAt)

	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Room not found", http.StatusNotFound)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rm)
}
