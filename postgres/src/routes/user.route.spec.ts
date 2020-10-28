import { Server } from "http";
import supertest from "supertest";

import { app } from "../app";

const mockUsers = [{
    id: 1,
    login: "Espinoza",
    password: "5f4eb9eddede127c6e9c00cd",
    age: 58,
    isDeleted: false
}, {
    id: 2,
    login: "Bass",
    password: "5f4eb9ed4f1d45184b0f3b47",
    age: 36,
    isDeleted: true
}, {
    id: 3,
    login: "Carpenter",
    password: "5f4eb9ed951ef02d2e7cdf02",
    age: 104,
    isDeleted: false
}];

jest.mock('../core/middleware', () => {
    const mockMiddleware = jest.fn((req, res, next) => {
        next()
    });
    return {checkToken: mockMiddleware, infoLoggerMiddleware: mockMiddleware, errorMiddleware: mockMiddleware};
});
jest.mock("../core/services/user.service", () => {
    const getAllUsers = jest.fn(() => Promise.resolve(mockUsers));
    const getUserById = jest.fn((u_id) =>
        Promise.resolve(mockUsers.filter(({id}) => id === +u_id))
    );
    const addUser = jest.fn((data) => Promise.resolve([data]));
    const updateUser = jest.fn((id, data) => Promise.resolve([data]));
    const deleteUser = jest.fn((id) => Promise.resolve('ok'));
    const addUserToGroup = jest.fn((u_id, g_id) => Promise.resolve('ok'));
    return {getAllUsers, getUserById, addUser, updateUser, deleteUser, addUserToGroup};
});

let server: Server;
let agent: supertest.SuperTest<supertest.Test>;

beforeEach((done) => {
    server = app.listen(4000, err => {
        if (err) return done(err);

        done();
    });
    agent = supertest(server);
});

describe('/users', () => {
    it('should response the GET method and return all mockUsers ', async (done) => {
        const result = await agent
            .get('/users');

        expect(result.status).toBe(200);
        expect(result.body.length).toBe(3);
        done();
    });

    it('should call the GET method and return user by id', async (done) => {
        const result = await agent
            .get('/users/1');

        expect(result.status).toBe(200);
        expect(result.body).toEqual({
            id: 1,
            login: "Espinoza",
            password: "5f4eb9eddede127c6e9c00cd",
            age: 58,
            isDeleted: false
        });
        done();
    });

    it('should call the POST method', async (done) => {
        const body = {
            login: "Prince",
            password: "5f4eb9ed9152efe6c6ae3bae",
            age: 91
        };
        const result = await agent
            .post('/users')
            .send(body);

        expect(result.status).toBe(201);
        expect(result.body).toEqual({
            login: "Prince",
            password: "5f4eb9ed9152efe6c6ae3bae",
            age: 91,
            isDeleted: false
        });
        done();
    });

    it('should call the POST method and failed', async (done) => {
        const body = {login: "Prince"};
        const result = await agent
            .post('/users')
            .send(body);

        expect(result.status).toBe(400);
        done();
    });

    it('should call the PUT method', async (done) => {
        const body = {
            login: "Prince",
            password: "5f4eb9ed9152efe6c6ae3bae",
            age: 33,
        };
        const result = await agent
            .put('/users/3')
            .send(body);

        expect(result.status).toBe(200);
        expect(result.body).toEqual([body]);
        done();
    });

    it('should call the PUT method and failed', async (done) => {
        const body = {};
        const result = await agent
            .put('/users/3')
            .send(body);

        expect(result.status).toBe(400);
        done();
    });

    it('should call the DELETE method', async (done) => {
        const result = await agent
            .delete('/users/2');

        expect(result.status).toBe(200);
        expect(result.text).toEqual('ok');
        done();
    });

    it('should call the POST method for add user into group', async (done) => {
        const result = await agent
            .post('/users/add-group')
            .send({user_id: 2, group_id: 2});

        expect(result.status).toBe(200);
        expect(result.text).toEqual('ok');
        done();
    });
});

afterEach(done => {
    server && server.close(done);
});
