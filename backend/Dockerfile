# Stage 1: Build Stage
FROM golang:1.25.4-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Step A: Copy dependency files first
# This ensures that 'go mod download' only runs when you change go.mod
COPY go.mod go.sum ./
RUN go mod download

# Step B: Copy the source code
COPY . .

# Step C: Build a static binary
# CGO_ENABLED=0 makes it a standalone file (no external Linux libraries needed)
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Stage 2: Final Runtime Stage
# We use 'alpine' for a tiny final image (about 15-20MB total)
FROM alpine:latest

# Security: Best practice for production apps
RUN apk --no-cache add ca-certificates

WORKDIR /app

# Copy only the compiled binary from the builder stage
COPY --from=builder /app/main .

# Copy your .env file so 'godotenv' can find it
COPY .env .

EXPOSE 5000

CMD ["./main"]