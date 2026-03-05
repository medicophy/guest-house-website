import express from 'express';
import { Client } from 'pg';

const app = express();
const port = 3000;

const client = new Client({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:159263@localhost:5432/guest_house_web?sslmode=disable"
});

client.connect();

app.get('/rooms', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM rooms');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});