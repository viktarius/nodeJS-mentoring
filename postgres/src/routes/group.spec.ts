import request from 'supertest'

import { app } from '../app';

describe('/groups', () => {
    let token: string;
    beforeAll((done) => {
        // Espinoza
        // 5f4eb9eddede127c6e9c00cd
        // request(app)
        //     .post('/auth/login', )
        //     .send({
        //         login: "Espinoza",
        //         password: "5f4eb9eddede127c6e9c00cd"
        //     })
        //     .then(response => {
        //         token = response.body.token;
        //         done();
        //     })
    });

    it('should response the GET method', async (done) => {
        // (checkToken as jest.Mock).mockImplementation((req, res, next) => next());
        request(app)
            .get('/groups')
            .set('x-access-token', 'token')
            .expect(200)
            .then(response => {
                done();
            });
    });
});
