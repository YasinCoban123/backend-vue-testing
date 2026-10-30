import express from "express";
import type { Request, Response, NextFunction } from 'express';
import homeRouter from "./routes/home.routes.js"
import productRouter from "./routes/product.routes.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)


const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.dirname(__filename))

app.use(express.urlencoded({ extended: true }))

app.use((req: Request, res: Response, next: NextFunction) => {
 console.log(`Request: ${req.method} ${req.url}`);
 next(); 
})
app.use("/shop", productRouter)
app.use(homeRouter)
app.use(productRouter)
app.use((req: Request, res: Response) => {
 res.sendFile(path.join(__dirname, ".", "views", "404.html"))
});
app.listen(PORT, () => {
 console.log(`Server running at http://localhost:${PORT}`);
});
