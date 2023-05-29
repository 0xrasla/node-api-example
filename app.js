const express = require("express");
const cors = require("cors"),
  morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const { data } = require("./data/data");

app.get("/", (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  const result = data.slice((page - 1) * limit, page * limit);

  return res.json({ ok: true, data: result });
});

app.get("/search", (req, res) => {
  const { name } = req.query;

  const result = data.filter((item) =>
    String(item.name).toLowerCase().includes(name.toLowerCase())
  );

  return res.json({ ok: true, data: result });
});

app.get("/:id", (req, res) => {
  const { id } = req.params;

  const result = data.find((item) => item.id === Number(id));

  return res.json({ ok: true, data: result });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 ");
});
