import express from "express";
import {
    addUser,
    createUser,
    deleteUser,
    getActiveUsers,
    getAutoSuggestUsers,
    getCurrentUser,
    green,
    updateUser
} from "./utils/common";
import bodyParser from 'body-parser';
import { validateUser } from "./utils/validator";

const app: express.Application = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/suggest-users', (req, res) => {
    const limit = req.query.limit;
    const loginSubstring = req.query.loginSubstr;
    res.json(getAutoSuggestUsers(String(loginSubstring), Number(limit)));
});

app.get('/users', (req, res) => {
    res.json(getActiveUsers());
});

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    const user = getCurrentUser(id);
    if (user) {
        res.json(user);
    }
    res.status(404).send('user not found');
});

app.post('/user', (req, res) => {
    try {
        const newUser = createUser(req.body);
        const {error} = validateUser(newUser);
        if (error) {
            res.status(400).send(error?.message)
        }
        addUser(newUser);
        res.status(201).json(newUser);
    } catch (e) {
        res.status(400).send(`invalid values ${e.message}`)
    }
});

app.put('/user/:id', (req, res) => {
    const id = req.params.id;
    const user = getCurrentUser(id);
    if (user) {
        const {error} = validateUser(user);
        if (error) {
            res.status(400).send(error?.message)
        }
        updateUser(user, req.body);
        res.status(204).json(user)
    }
    res.status(404).send('user not found');
});

app.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    const user = getCurrentUser(id);
    if (user) {
        deleteUser(user);
        res.send(`user ${user.id} successfully deleted`);
    }
    res.status(404).send('user not found');
});

app.listen(3000, function () {
    console.log(`App is listening on port ${green(PORT)}!`);
});
