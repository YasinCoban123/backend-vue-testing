
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Product, getAllProducts, addProduct } from "../models/Product.js";
import type { Request, Response } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


function showProducts(req: Request, res: Response) {
   res.render("products", {products: getAllProducts()})
}

function showAddProductPage(req: Request, res: Response)
{
  res.sendFile(path.join(__dirname, "..", "views", "add-products.html"))
}

function handleAddProductPage(req: Request, res: Response)
{
  const product = req.body
  addProduct(new Product(product.name, product.description, product.price))
  res.sendFile(path.join(__dirname, "..", "views", "add-products.html"))
}

export {showProducts, handleAddProductPage, showAddProductPage};