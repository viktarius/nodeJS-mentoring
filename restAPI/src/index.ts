import express from "express";
import { activeUsers, addUser, getAutoSuggestUsers, getCurrentUser, green } from "./utils/common";
import { User } from "./utils/user";
import bodyParser from 'body-parser';

const app: express.Application = express();
const PORT = Number(process.env.PORT) || 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/suggest-users', (req, res) => {
    const limit = 3;
    const loginSubstring = "fi";
    res.json(getAutoSuggestUsers(loginSubstring, limit));
});

app.get('/users', (req, res) => {
    res.json(activeUsers);
});

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    const user = getCurrentUser(id);
    if (user) {
        res.json(user);
    }
    res.send('USER NOT FOUND');
});

app.post('/user', (req, res) => {
    try {
        const {login, password, age} = req.body;
        const newUser = new User(login, password, age);
        addUser(newUser);
        res.send('added successfully');
    } catch (e) {
        res.status(400).send('invalid user')
    }

});

app.put('/user/:id', (req, res) => {
    const id = req.params.id;
    const user = getCurrentUser(id);
    if (user) {
        const {login, password, age} = req.body;
        user.login = login || user.login;
        user.password = password || user.password;
        user.age = age || user.age;
        res.send('updated successfully');
    }
    res.send('USER NOT FOUND');
});

app.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    const user = getCurrentUser(id);
    if (user) {
        user.isDeleted = true;
        res.send('deleted successfully');
    }
    res.send('USER NOT FOUND');
});

app.listen(3000, function () {
    console.log(`App is listening on port ${green(PORT)}!`);
});
