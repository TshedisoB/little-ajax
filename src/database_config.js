require("dotenv").config();
const { Pool } = require("pg");

const poolDetails = {
  user: process.env.PG_USER || "user",
  host: process.env.PG_HOST || "localhost",
  database: process.env.PG_DB || "db",
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 5432,
};

const pool = new Pool(poolDetails);

module.exports = { pool };
