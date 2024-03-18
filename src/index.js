const { queries } = require("./queries");
const { pool } = require("./database_config");

const idNotFound = "ID not found in database!";
const noVisitors = "No visitors found in the database";

function createTable() {
  pool.query(queries.createTableQuery, (err, res) => {
    if (err) throw new Error(err);
    return res;
  });
}

async function addNewVisitor(name, age, date, time, assistedBy, comments) {
  const values = [name, age, date, time, assistedBy, comments];
  const res = await pool.query(queries.addNewVisitorQuery, values);
  return res.rows;
}

async function deleteVisitor(id) {
  const value = [id];
  const beforeDelete = await pool.query(queries.viewOneVisitorQuery, value);
  const res = await pool.query(queries.deleteVisitorQuery, value);

  if (beforeDelete.rows.length === 0) {
    return idNotFound;
  }
  return res;
}

async function listAllVisitors() {
  const res = await pool.query(queries.listAllVisitorsQuery);

  if (res.rows.length === 0) {
    return JSON.stringify(noVisitors);
  }
  return res.rows;
}

module.exports = {
  idNotFound,
  createTable,
  addNewVisitor,
  deleteVisitor,
  listAllVisitors,
};
