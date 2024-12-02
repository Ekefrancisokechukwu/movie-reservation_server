const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

async function queryDB(query, params) {
  const client = await pool.connect();

  try {
    const res = await client.query(query, params);
    return res;
  } catch (err) {
    console.error("Database query error:", err);
    throw err;
  } finally {
    client.release();
  }
}

// Graceful shutdown to close the pool
async function closeDB() {
  try {
    await pool.end();
    console.log("Database connection pool closed.");
  } catch (err) {
    console.error("Error closing the pool:", err.stack);
  }
}

module.exports = { queryDB, closeDB };
