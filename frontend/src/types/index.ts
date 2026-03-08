export interface Room {
    id: number;
    name: string;
    description: string;
    price_per_night: number;
    capacity: number;
    image_url: string;
    created_at: string; // Dates are sent as strings in JSON
  }