const queries = {
  createTableQuery: `CREATE TABLE IF NOT EXISTS Visitors (
        ID SERIAL PRIMARY KEY NOT NULL,
        Name VARCHAR(50) NOT NULL,
        Age INT NOT NULL,
        Date DATE NOT NULL,
        Time TIME NOT NULL,
        AssistedBy VARCHAR(50) NOT NULL,
        Comments VARCHAR(255) NOT NULL
    )`,
  addNewVisitorQuery: `INSERT INTO Visitors(Name, Age, Date, Time, AssistedBy, Comments)
    VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
  deleteVisitorQuery: `DELETE FROM Visitors WHERE ID = $1`,
  listAllVisitorsQuery: `SELECT * FROM Visitors`,
  viewOneVisitorQuery: `SELECT * FROM Visitors WHERE ID = $1`,
};

module.exports = { queries };
