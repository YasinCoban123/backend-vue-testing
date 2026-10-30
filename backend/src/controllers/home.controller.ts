import path from "node:path";
import { fileURLToPath } from "node:url";
import { getAllProducts } from "../models/Product.js";
import type { Request, Response } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


function showHomepage(req: Request, res: Response) {
  const products = getAllProducts()
  console.log(products.length)
   res.sendFile(path.join(__dirname, "..", "views", "home.html"))
}

export{showHomepage}