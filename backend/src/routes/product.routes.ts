import express from "express";
import type { Request, Response } from 'express';
import path from "node:path";
import { fileURLToPath } from "node:url";

const productrouter = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const products = [];

productrouter.get("/products", (req: Request, res: Response) => {
  console.log(products)
 res.sendFile(path.join(__dirname, "..", "views", "products.html"))
});
productrouter.get("/add-product", (req: Request, res: Response) => {
 res.sendFile(path.join(__dirname, "..", "views", "add-product.html"))
});
productrouter.post("/add-product", (req: Request, res: Response) => {
  console.log(req.body)
  products.push(req.body)
 res.sendFile(path.join(__dirname, "..", "views", "add-product.html"))
});

export default productrouter;