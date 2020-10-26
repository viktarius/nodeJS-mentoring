import supertest from 'supertest'
import { Server } from 'http';

import { app } from '../app';
// import { groupService } from "../core/services";

jest.mock('../core/middleware/auth.middleware', () => {
    const checkToken = jest.fn((req, res, next) => next());
    return {checkToken};
});
// const groupService = jest.mock("../core/services", () => {
//     const getAllGroups = jest.fn((req, res) => res([]));
//     return {
//         groupService: {
//             getAllGroups
//         }
//     };
// });
// jest.mock('groupService');

let server: Server;
let agent: supertest.SuperTest<supertest.Test>;

beforeAll((done) => {
    server = app.listen(4000, err => {
        if (err) return done(err);

        agent = supertest(server);
        done();
    });
});
describe('/groups', () => {

    it('should response the GET method', async (done) => {
        groupService.getAllGroups.mockResolvedValue(resp)
        const result = await agent
            .get('/groups');

        expect(result.status).toBe(200);
    });

});

afterAll(done => {
    server && server.close(done);
});
