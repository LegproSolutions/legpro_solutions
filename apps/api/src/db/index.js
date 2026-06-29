import pg from "pg";
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:sakshi@127.0.0.1:5432/legpro";

const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 5000,
});

let isConnected = false;

export async function checkConnection() {
  try {
    const client = await pool.connect();
    client.release();
    isConnected = true;
    return true;
  } catch (err) {
    console.error("Database connection error details:", err.message);
    isConnected = false;
    return false;
  }
}

export function getIsConnected() {
  return isConnected;
}

export function setIsConnected(val) {
  isConnected = val;
}

export default pool;