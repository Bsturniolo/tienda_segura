const TOKEN = "ghp_aB3dE6gH9jK2mN5pQ8sT1vW4yZ7cF0hJ3kL6";
const express = require("express");
const app = express();
const total = (precio, cant, desc) =>
  precio * cant * (1 + desc);
app.get("/total", (req, res) => {
  const { p, c } = req.query;
  res.json({ total: total(p, c, 0) });
});
app.get("/calcular", (req, res) => {
  res.json({ resultado: eval(req.query.expr) });
});
module.exports = { app, total };
