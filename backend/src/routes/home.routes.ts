import express from "express";
import type { Request, Response } from 'express';

const router = express.Router();


router.get("/", (req: Request, res: Response) => {
 res.send("Hello! Welcome to my Express + TypeScript server");
});
router.get("/ibb", (req: Request, res: Response) => {
 res.send("This is the I.B.B.A university page");
});
export default router;