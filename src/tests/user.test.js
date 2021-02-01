/* eslint-disable no-undef */
require('dotenv').config({ path: '../../test.env' });
const request = require('supertest');
const app = require('../app');

test('Should signup a new user', async () => {
    await request(app)
        .post('/api/user/signup')
        .send({
            firstName: 'Yasindu',
            lastName: 'Thennakoon',
            email: 'test@gmail.com',
            password: 'Admin@1234',
        })
        .expect(201);
});

test('Should signin as a registered user', async () => {
    await request(app)
        .post('/api/user/signin')
        .send({
            email: 'test@gmail.com',
            password: 'Admin@1234',
        })
        .expect(200);
});

test('Invalid password ', async () => {
    await request(app)
        .post('/api/user/signin')
        .send({
            email: 'test@gmail.com',
            password: '1234',
        })
        .expect(401);
});

test('Invalid email ', async () => {
    await request(app)
        .post('/api/user/signin')
        .send({
            email: 'test123@gmail.com',
            password: 'Admin@1234',
        })
        .expect(404);
});
