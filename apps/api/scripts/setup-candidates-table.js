import pool, { checkConnection } from "../src/db/index.js";

async function setupCandidatesTable() {
  try {
    const isConnected = await checkConnection();
    if (!isConnected) {
      console.error("Database connection failed");
      process.exit(1);
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS candidates (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(200) NOT NULL,
        mobile_number VARCHAR(30) NOT NULL,
        email VARCHAR(255) NOT NULL,
        current_location VARCHAR(200) NOT NULL,
        highest_qualification VARCHAR(200) NOT NULL,
        resume_filename VARCHAR(255),
        resume_data TEXT,
        resume_mime_type VARCHAR(100),
        job_title VARCHAR(200),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("candidates table created/verified successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error creating candidates table:", err);
    process.exit(1);
  }
}

setupCandidatesTable();
