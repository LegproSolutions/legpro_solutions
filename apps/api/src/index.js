import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import pool, { checkConnection } from "./db/index.js";
import contactRoutes from "./routes/contact.js";
import jobsRoutes from "./routes/jobs.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "LEGPRO Services API is running successfully!",
    endpoints: {
      health: `http://localhost:${PORT}/api/health`,
      contacts: `http://localhost:${PORT}/api/v1/contact`,
      jobs: `http://localhost:${PORT}/api/v1/jobs`
    }
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ success: true, status: "ok" });
});

app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/jobs", jobsRoutes);

async function start() {
  try {
    const dbConnected = await checkConnection();
    if (dbConnected) {
      console.log("PostgreSQL connected");
      await pool.query(`
        CREATE TABLE IF NOT EXISTS contacts (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(100) NOT NULL,
          last_name VARCHAR(100) NOT NULL,
          email VARCHAR(255) NOT NULL,
          company VARCHAR(200),
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log("PostgreSQL schema verified/created");
    } else {
      throw new Error("Could not establish connection to PostgreSQL");
    }
  } catch (err) {
    console.warn("PostgreSQL unavailable — contact will use in-memory fallback");
    console.warn(err.message);
  }

  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
}

// Trigger reload again
start();

