import express from "express";
// import type { Request, Response } from 'express';
import path from "node:path";
import { fileURLToPath } from "node:url";
import { handleAddProductPage, showAddProductPage, showProducts } from "../controllers/product.controller.js";



const productrouter = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

productrouter.get("/products", showProducts);
productrouter.get("/products", showAddProductPage);
productrouter.post("/products", handleAddProductPage);


export default productrouter;