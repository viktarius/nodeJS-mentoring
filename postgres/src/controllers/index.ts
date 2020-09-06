import express from "express";
import { userRouter } from "./user.contorller";
import { groupRouter } from "./group.controller";

const router = express.Router();

router.use('/users', userRouter);
router.use('/groups', groupRouter);

export default router;
