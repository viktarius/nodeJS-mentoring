import express from "express";
import { createValidator } from "express-joi-validation";
import { userService } from "../services";
import { userSchema } from "../validators";
import { userMapper } from "../mappers";
import { createUser } from "../utils/user.util";

const router = express.Router();
const validator = createValidator();

router.get("/", async (req, res) => {
    const users = await userService.getAll();
    res.send(users.rows)
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userService.getUserById(id);
        res.json(userMapper.toDomain(user.rows[0]));
    } catch (e) {
        res.status(404).send('user not found');
    }
});

router.post('/add', validator.body(userSchema), async (req, res) => {
    const newUser = createUser(req.body);
    try{
        await userService.addUser(userMapper.toBase(newUser));
        res.status(201).send('ok');
    }catch (e) {
        res.status(500).send(e.message);
    }
});

router.put('/update/:id', validator.body(userSchema), async (req, res) => {
    const id = req.params.id;
    try{
        await userService.updateUser(id ,req.body);
        res.status(204).send('ok');
    }catch (e) {
        res.status(500).send(e.message);
    }
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
