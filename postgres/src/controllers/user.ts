import express from "express";
import { db } from "../services";

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await db.getAll();
    res.send(users.rows)
});

export { router as userRouter };
