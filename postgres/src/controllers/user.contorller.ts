import express from "express";
import { createValidator } from "express-joi-validation";
import { userService } from "../core/services";
import { userSchema } from "../validators";
import { createUser } from "../core/utils/user.util";
import { HttpException } from "../core/exeption";

const router = express.Router();
const validator = createValidator();

router.get("/", async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users)
    } catch (e) {
        next(new HttpException(500, e.message));
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userService.getUserById(id);
        if (user.length) {
            res.json(user[0]);
        }
        next(new HttpException(404, 'user not found'));
    } catch (e) {
        next(new HttpException(500, e.message));
    }
});

router.post('/', validator.body(userSchema), async (req, res, next) => {
    try {
        const newUser = createUser(req.body);
        const createdUser = await userService.addUser(newUser);
        res.status(201).json(createdUser[0]);
    } catch (e) {
        next(new HttpException(500, e.message));
    }
});

router.put('/:id', validator.body(userSchema), async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedUser = await userService.updateUser(id, req.body);
        res.json(updatedUser);
    } catch (e) {
        next(new HttpException(e?.status || 500, e.message));
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await userService.deleteUser(id);
        res.send('ok');
    } catch (e) {
        next(new HttpException(500, e.message));
    }
});

router.post('/add-group', async (req, res, next) => {
    try {
        const {user_id, group_id} = req.body;
        await userService.addUserToGroup(group_id, user_id);
        res.send('ok');
    } catch (e) {
        next(new HttpException(500, e.message));
    }
});

export { router as userRouter };
