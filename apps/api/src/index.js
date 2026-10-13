import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import pool, { checkConnection } from "./db/index.js";
import contactRoutes from "./routes/contact.js";
import jobsRoutes from "./routes/jobs.js";
import candidateRoutes from "./routes/candidates.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));

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
      candidates: `http://localhost:${PORT}/api/v1/candidates`,
      jobs: `http://localhost:${PORT}/api/v1/jobs`
    }
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ success: true, status: "ok" });
});

app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/candidates", candidateRoutes);
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

      await pool.query(`
        CREATE TABLE IF NOT EXISTS candidates (
          id SERIAL PRIMARY KEY,
          full_name VARCHAR(200) NOT NULL,
          mobile_number VARCHAR(30) NOT NULL,
          email VARCHAR(255) NOT NULL,
          current_location VARCHAR(200) NOT NULL,
          highest_qualification VARCHAR(200) NOT NULL,
          total_experience VARCHAR(100),
          current_company VARCHAR(200),
          current_designation VARCHAR(200),
          skills TEXT,
          profile_category VARCHAR(100),
          preferred_role VARCHAR(200),
          preferred_location VARCHAR(200),
          current_ctc VARCHAR(100),
          expected_ctc VARCHAR(100),
          notice_period VARCHAR(100),
          linkedin_url VARCHAR(500),
          resume_filename VARCHAR(255),
          resume_data TEXT,
          resume_mime_type VARCHAR(100),
          status VARCHAR(50) DEFAULT 'New',
          notes TEXT,
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

  const server = app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`Port ${PORT} is busy. Retrying in 1s or please terminate old background process.`);
    } else {
      console.error("Server error:", err);
    }
  });
}

start();

