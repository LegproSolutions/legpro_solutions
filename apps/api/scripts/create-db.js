import pg from "pg";

const { Client } = pg;

// Connect to the default postgres database to create a new one
const client = new Client({
  connectionString: "postgresql://postgres:sakshi@127.0.0.1:5432/postgres",
  connectionTimeoutMillis: 5000,
});

async function setup() {
  try {
    await client.connect();
    console.log("Connected to postgres");

    // Check if legpro database already exists
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = 'legpro'"
    );

    if (result.rowCount === 0) {
      await client.query("CREATE DATABASE legpro");
      console.log("✅ Database 'legpro' created successfully!");
    } else {
      console.log("ℹ️  Database 'legpro' already exists.");
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

setup();
