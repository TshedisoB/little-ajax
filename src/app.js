const express = require("express");
const path = require("path");
const {
  idNotFound,
  createTable,
  addNewVisitor,
  deleteVisitor,
  listAllVisitors,
} = require("./index");

const app = express();
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use("/styles", express.static(__dirname + "public/styles/index.css"));
app.use("/scripts", express.static(__dirname + "public/scripts/ajax_call.js"));

const port = 3000;

app.get("/single_page_app", async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/single_page_app.html"));
});

createTable();
app.post("/single_page_app", async (req, res) => {
  const { name, age, date, time, assistedBy, comments } = req.body;

  await addNewVisitor(name, age, date, time, assistedBy, comments);
  res.status(201).send("New visitor added successfully");
});

app.delete("/single_page_app/:id", async (req, res) => {
  const { id } = req.params;
  const deleteOne = await deleteVisitor(id);

  if (deleteOne === idNotFound) {
    res.status(404).send(idNotFound);
  }
  res.status(200).send(deleteOne);
});

app.get("/single_page_app/all", async (req, res) => {
  const viewVisitors = await listAllVisitors();
  res.send(viewVisitors);
});

app.listen(port, () => {
  console.log(
    `listening on localhost Port:${port}\nhttp://localhost:${port}/single_page_app`
  );
});
