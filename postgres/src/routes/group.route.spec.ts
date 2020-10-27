import supertest from 'supertest'

import { Server } from 'http';

import { app } from '../app';

jest.mock('../core/middleware/auth.middleware', () => {
    const checkToken = jest.fn((req, res, next) => {
        console.log('mock');
        next()
    });
    return {checkToken};
});
jest.mock("../core/services/group.service", () => {
    const getAllGroups = jest.fn().mockResolvedValue([1,2,3]);
    return {getAllGroups};
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

    it('should response the GET method', async (done) => {
        const result = await agent
            .get('/groups');

        // const result = await getAllGroups();

        expect(result.status).toBe(200);
        done()
    }, 30000);

});

afterEach(done => {
    server && server.close(done);
});
