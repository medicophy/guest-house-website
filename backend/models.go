package main

import "time"

type Room struct {
	ID            int       `json:"id"`
	Name          string    `json:"name"`
	Description   string    `json:"description"`
	PricePerNight float64   `json:"price_per_night"`
	Capacity      int       `json:"capacity"`
	ImageURL      string    `json:"image_url"`
	CreatedAt     time.Time `json:"created_at"`
}
