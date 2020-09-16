import express from "express";
import { router as userRouter } from "./user.controller";
import { router as groupRouter } from "./group.controller";

const router = express.Router();

router.use('/users', userRouter);
router.use('/groups', groupRouter);

export default router;
