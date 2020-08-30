import express from "express";
import * as Joi from '@hapi/joi'
import { createValidator } from 'express-joi-validation'
import { userService } from "../services";

const router = express.Router();
const validator = createValidator();

const querySchema = Joi.object({
    login: Joi.string().required(),
    age: Joi.number().min(4).max(130).required(),
    password: Joi.string().regex(/[a-z]/).regex(/[0-9]/).required()
});

router.get("/", async (req, res) => {
    const users = await userService.getAll();
    res.send(users.rows)
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userService.getUserById(id);
        res.json(user.rows[0]);
    } catch (e) {
        res.status(404).send('user not found');
    }
});

router.post('/add', validator.body(querySchema), (req, res) => {
    res.send("hello new user");
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await userService.deleteUser(id);
        res.send('ok');
    } catch (e) {
        res.status(404).send('user not found');
    }
});

export { router as userRouter };
