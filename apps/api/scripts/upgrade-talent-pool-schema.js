import pool, { checkConnection } from "../src/db/index.js";

async function upgradeTalentPoolSchema() {
  try {
    const isConnected = await checkConnection();
    if (!isConnected) {
      console.error("Database connection failed");
      process.exit(1);
    }

    // Alter table or create if not exists
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

    // Ensure all new columns exist on existing table
    const columnsToAdd = [
      { name: "total_experience", type: "VARCHAR(100)" },
      { name: "current_company", type: "VARCHAR(200)" },
      { name: "current_designation", type: "VARCHAR(200)" },
      { name: "skills", type: "TEXT" },
      { name: "profile_category", type: "VARCHAR(100)" },
      { name: "preferred_role", type: "VARCHAR(200)" },
      { name: "preferred_location", type: "VARCHAR(200)" },
      { name: "current_ctc", type: "VARCHAR(100)" },
      { name: "expected_ctc", type: "VARCHAR(100)" },
      { name: "notice_period", type: "VARCHAR(100)" },
      { name: "linkedin_url", type: "VARCHAR(500)" },
      { name: "status", type: "VARCHAR(50) DEFAULT 'New'" },
      { name: "notes", type: "TEXT" }
    ];

    for (const col of columnsToAdd) {
      await pool.query(`
        ALTER TABLE candidates 
        ADD COLUMN IF NOT EXISTS ${col.name} ${col.type};
      `);
    }

    console.log("✅ Candidate Talent Pool table upgraded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error upgrading schema:", err);
    process.exit(1);
  }
}

upgradeTalentPoolSchema();
