import supertest from 'supertest'
import { Server } from 'http';

import { app } from '../app';

const groups = [{
    id: 1,
    name: 'first'
}, {
    id: 2,
    name: 'second'
}, {
    id: 3,
    name: 'third'
}];

jest.mock('../core/middleware/auth.middleware', () => {
    const checkToken = jest.fn((req, res, next) => {
        next()
    });
    return {checkToken};
});
jest.mock("../core/services/group.service", () => {
    const getAllGroups = jest.fn(() => Promise.resolve(groups));
    const getGroupById = jest.fn((g_id) => {
        const iid = +g_id;
        return Promise.resolve(groups.filter(({id}) => id === iid))
    });
    const addGroup = jest.fn((data) => Promise.resolve([data]));
    const updateGroup = jest.fn((id, data) => Promise.resolve([data]));
    const deleteGroup = jest.fn((id) => Promise.resolve('ok'));
    return {getAllGroups, getGroupById, addGroup, updateGroup, deleteGroup};
});
jest.mock("../core/mappers/group.mapper", () => {
    const mockMapper = jest.fn((data) => data);
    return {toDomain: mockMapper, toBase: mockMapper};
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

describe('/groups', () => {

    it('should response the GET method and get all groups', async (done) => {
        const result = await agent
            .get('/groups');

        expect(result.status).toBe(200);
        done();
    });

    it('should call the GET method and get group by id', async (done) => {
        const result = await agent
            .get('/groups/2');

        expect(result.status).toBe(200);
        expect(result.body).toEqual({id: 2, name: 'second'});
        done();
    });

    it('should call the POST method', async (done) => {
        const body = {
            name: "John",
            permisiions: ['READ', 'WRITE']
        };
        const result = await agent
            .post('/groups')
            .send(body);

        expect(result.status).toBe(201);
        expect(result.body).toEqual(body);
        done();
    });

    it('should call the PUT method', async (done) => {
        const body = {
            name: "second-2",
        };
        const result = await agent
            .put('/groups/2')
            .send(body);

        expect(result.status).toBe(200);
        expect(result.body).toEqual([body]);
        done();
    });

    it('should call the DELETE method', async (done) => {
        const result = await agent
            .delete('/groups/2');

        expect(result.status).toBe(200);
        expect(result.text).toEqual('ok');
        done();
    });

});

afterEach(done => {
    server && server.close(done);
});
