import pool from "../db/index.js";

const Contact = {
  async create(data) {
    const { firstName, lastName, email, company, message } = data;
    const queryText = `
      INSERT INTO contacts (first_name, last_name, email, company, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, first_name, last_name, email, company, message, created_at, updated_at;
    `;
    const values = [
      firstName.trim(),
      lastName.trim(),
      email.toLowerCase().trim(),
      company?.trim() || null,
      message.trim()
    ];
    
    const res = await pool.query(queryText, values);
    const row = res.rows[0];
    
    return {
      _id: row.id,
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      company: row.company,
      message: row.message,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  },

  async findAll() {
    const queryText = `
      SELECT id, first_name, last_name, email, company, message, created_at, updated_at
      FROM contacts
      ORDER BY created_at DESC;
    `;
    const res = await pool.query(queryText);
    return res.rows.map(row => ({
      _id: row.id,
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      company: row.company,
      message: row.message,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }
};

export default Contact;
