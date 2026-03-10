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
	_ "github.com/lib/pq" // Using alias or blank import as needed
)

// Using your existing types.
// NOTE: Make sure 'Room' is available here. If it's in models.go in the same 'main' package,
// this will work. If it's in a 'models' package, use models.Room.

type Booking struct {
	ID         int     `json:"id"`
	RoomID     int     `json:"room_id"`
	GuestName  string  `json:"guest_name"`
	GuestEmail string  `json:"guest_email"`
	CheckIn    string  `json:"check_in"`
	CheckOut   string  `json:"check_out"`
	TotalPrice float64 `json:"total_price"`
	Status     string  `json:"status"`
}

type DashboardStats struct {
	TotalRevenue   float64 `json:"total_revenue"`
	TotalBookings  int     `json:"total_bookings"`
	ActiveBookings int     `json:"active_bookings"`
}

type Inquiry struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

var db *sql.DB

func main() {
	if err := godotenv.Load("../.env"); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	dbURL := os.Getenv("DATABASE_URL")
	var err error
	db, err = sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	if err = db.Ping(); err != nil {
		log.Fatal("Could not connect to database:", err)
	}
	fmt.Println("Connected to guest_house_web database")

	r := chi.NewRouter()
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://localhost:5500"}, // Added 3000 for Next.js
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: true,
	}))
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// API Routes
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) { w.Write([]byte("OK")) })

	// Room Management
	r.Get("/api/rooms", getAvailableRooms)
	r.Post("/api/rooms", createRoom)
	r.Get("/api/rooms/search", searchRooms)
	r.Get("/api/rooms/{id}", getRoomByID)
	r.Put("/api/rooms/{id}", updateRoom)
	r.Delete("/api/rooms/{id}", deleteRoom)

	// Bookings
	r.Post("/api/bookings", createBooking)
	r.Get("/api/bookings", getBookings)
	r.Put("/api/bookings/{id}/status", updateBookingStatus)

	// Admin
	r.Get("/api/admin/stats", getDashboardStats)
	r.Post("/api/contact", handleInquiry)

	port := "5000"
	fmt.Printf("Server starting on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}

// --- Handler Functions ---

func searchRooms(w http.ResponseWriter, r *http.Request) {
	queryParam := r.URL.Query().Get("q")
	rows, err := db.Query("SELECT id, name, description, price_per_night, capacity, image_url FROM rooms WHERE name ILIKE $1 OR description ILIKE $1", "%"+queryParam+"%")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var rooms []Room
	for rows.Next() {
		var rm Room
		rows.Scan(&rm.ID, &rm.Name, &rm.Description, &rm.PricePerNight, &rm.Capacity, &rm.ImageURL)
		rooms = append(rooms, rm)
	}
	json.NewEncoder(w).Encode(rooms)
}

func getAvailableRooms(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT id, name, description, price_per_night, capacity, image_url FROM rooms")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var rooms []Room
	for rows.Next() {
		var rm Room
		rows.Scan(&rm.ID, &rm.Name, &rm.Description, &rm.PricePerNight, &rm.Capacity, &rm.ImageURL)
		rooms = append(rooms, rm)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rooms)
}

func getRoomByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var rm Room
	query := "SELECT id, name, description, price_per_night, capacity, image_url FROM rooms WHERE id = $1"
	err := db.QueryRow(query, id).Scan(&rm.ID, &rm.Name, &rm.Description, &rm.PricePerNight, &rm.Capacity, &rm.ImageURL)
	if err != nil {
		http.Error(w, "Room not found", http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(rm)
}

func createRoom(w http.ResponseWriter, r *http.Request) {
	var room Room
	if err := json.NewDecoder(r.Body).Decode(&room); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := `INSERT INTO rooms (name, description, price_per_night, capacity, image_url) 
              VALUES ($1, $2, $3, $4, $5) RETURNING id`
	err := db.QueryRow(query, room.Name, room.Description, room.PricePerNight, room.Capacity, room.ImageURL).Scan(&room.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(room)
}

func updateRoom(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var room Room
	if err := json.NewDecoder(r.Body).Decode(&room); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := `UPDATE rooms SET name=$1, description=$2, price_per_night=$3, capacity=$4, image_url=$5 WHERE id=$6`
	_, err := db.Exec(query, room.Name, room.Description, room.PricePerNight, room.Capacity, room.ImageURL, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}

func deleteRoom(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	_, err := db.Exec("DELETE FROM rooms WHERE id = $1", id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func createBooking(w http.ResponseWriter, r *http.Request) {
	var b Booking
	if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// 1. Check for date overlaps
	// Logic: A collision occurs if (ExistingCheckIn < NewCheckOut) AND (ExistingCheckOut > NewCheckIn)
	var exists bool
	checkQuery := `
        SELECT EXISTS (
            SELECT 1 FROM bookings 
            WHERE room_id = $1 
            AND status != 'cancelled'
            AND check_in < $3 
            AND check_out > $2
        )`

	err := db.QueryRow(checkQuery, b.RoomID, b.CheckIn, b.CheckOut).Scan(&exists)
	if err != nil {
		http.Error(w, "Database error during availability check", http.StatusInternalServerError)
		return
	}

	if exists {
		http.Error(w, "Room is already booked for these dates", http.StatusConflict)
		return
	}

	// 2. Insert the booking if no overlap is found
	query := `INSERT INTO bookings (room_id, guest_name, guest_email, check_in, check_out, total_price) 
              VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, status`

	// Use = here because err is already declared above
	err = db.QueryRow(query, b.RoomID, b.GuestName, b.GuestEmail, b.CheckIn, b.CheckOut, b.TotalPrice).Scan(&b.ID, &b.Status)
	if err != nil {
		http.Error(w, "Failed to save booking: "+err.Error(), http.StatusInternalServerError)
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

func getDashboardStats(w http.ResponseWriter, r *http.Request) {
	var stats DashboardStats

	// This query calculates revenue and counts in one go
	query := `
		SELECT 
			COALESCE(SUM(total_price), 0), 
			COUNT(*),
			COUNT(*) FILTER (WHERE status = 'confirmed')
		FROM bookings 
		WHERE status != 'cancelled'`

	err := db.QueryRow(query).Scan(&stats.TotalRevenue, &stats.TotalBookings, &stats.ActiveBookings)
	if err != nil {
		http.Error(w, "Stats error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stats)
}

// Handler for inquiries
func handleInquiry(w http.ResponseWriter, r *http.Request) {
	var inq Inquiry
	json.NewDecoder(r.Body).Decode(&inq)
	// In a real app, you'd save this to a 'inquiries' table
	fmt.Printf("New Inquiry from %s: %s\n", inq.Name, inq.Message)
	w.WriteHeader(http.StatusCreated)
}
