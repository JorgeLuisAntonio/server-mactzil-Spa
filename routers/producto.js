const express = require("express");
const ProductoController = require("../controllers/producto");

const api = express.Router();

api.post("/add-producto", ProductoController.add);
api.get("/list-producto", ProductoController.list);
api.delete("/delete-producto/:id", ProductoController.deleteProduct);
api.put("/update-producto/:id", ProductoController.updateProduct);
module.exports = api;