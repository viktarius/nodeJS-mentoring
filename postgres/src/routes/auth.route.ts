import express from 'express';
import * as jwt from 'jsonwebtoken';

import { userService } from '../core/services';
import { SECRET_KEY } from "../config/app.config";

const router = express.Router();

router.post('/', async (req, res) => {
    const {login, password} = req.body;
    const users = await userService.getAllUsers();
    const user = users.find(({login: user_login, password: user_password}) => user_login === login && user_password === password);
    if (!user) {
        return res.status(401).send({
            success: false,
            message: 'Bad login/password combination.'
        })
    }

    const payload = {login: user.login};
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: 300});
    return res.send({token});
});

export { router as authRouter };
