import express from "express";
import { userRouter } from "./user.route";
import { groupRouter } from "./group.route";
import { authRouter } from "./auth.route";

const router = express.Router();

router.use('/users', userRouter);
router.use('/groups', groupRouter);
router.use('/auth', authRouter);

export default router;
