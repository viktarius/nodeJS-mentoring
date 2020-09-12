import express from "express";
import { createValidator } from "express-joi-validation";
import { userService } from "../services";
import { userSchema } from "../validators";
import { createUser } from "../utils/user.util";

const router = express.Router();
const validator = createValidator();

router.get("/", async (req, res) => {
    const users = await userService.getAllUsers();
    res.json(users)
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userService.getUserById(id);
        res.json(user[0]);
    } catch (e) {
        res.status(404).send('user not found');
    }
});

router.post('/', validator.body(userSchema), async (req, res) => {
    const newUser = createUser(req.body);
    try {
        const createdUser = await userService.addUser(newUser);
        res.status(201).json(createdUser[0]);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.put('/:id', validator.body(userSchema), async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await userService.updateUser(id, req.body);
        res.json(updatedUser);
    } catch (e) {
        res.status(404).send(e.message);
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

router.post('/add-group', async (req, res) => {
    const {user_id, group_id} = req.body;
    try {
        await userService.addUserToGroup(group_id, user_id);
        res.send('ok');
    } catch (e) {
        res.status(500).send(e.message);
    }
});

export { router as userRouter };
