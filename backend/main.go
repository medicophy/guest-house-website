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

type Booking struct {
	ID         int     `json:"id"`
	RoomID     int     `json:"room_id"`
	GuestName  string  `json:"guest_name"`
	GuestEmail string  `json:"guest_email"`
	CheckIn    string  `json:"check_in"`  // Matches your 'check_in' column
	CheckOut   string  `json:"check_out"` // Matches your 'check_out' column
	TotalPrice float64 `json:"total_price"`
	Status     string  `json:"status"`
}

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

	r.Post("/api/bookings", createBooking)
	r.Get("/api/bookings", getBookings)
	r.Put("/api/bookings/{id}/status", updateBookingStatus)
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

func createBooking(w http.ResponseWriter, r *http.Request) {
	var b Booking
	if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Using your exact column names: check_in, check_out
	query := `INSERT INTO bookings (room_id, guest_name, guest_email, check_in, check_out, total_price) 
              VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, status`

	err := db.QueryRow(query, b.RoomID, b.GuestName, b.GuestEmail, b.CheckIn, b.CheckOut, b.TotalPrice).Scan(&b.ID, &b.Status)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(b)
}

func getBookings(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT id, room_id, guest_name, guest_email, check_in, check_out, total_price, status FROM bookings ORDER BY created_at DESC")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var bookings []Booking
	for rows.Next() {
		var b Booking
		if err := rows.Scan(&b.ID, &b.RoomID, &b.GuestName, &b.GuestEmail, &b.CheckIn, &b.CheckOut, &b.TotalPrice, &b.Status); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		bookings = append(bookings, b)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(bookings)
}

func updateBookingStatus(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var body struct {
		Status string `json:"status"`
	}

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	_, err := db.Exec("UPDATE bookings SET status = $1 WHERE id = $2", body.Status, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Status updated successfully"})
}
