const supertest = require('supertest');
const app = require('../app');


describe('GET /',()=>{
    it('should return Hello World', async()=>{
        const response =  await supertest(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello World');
    });

})

describe('POST /api/auth/register', ()=>{
    it('should return 400 if any field is missing', async()=>{
const res = await supertest(app).post('/api/auth/register').send({
    username: 'testuser',
    password: 'testpass',
    email: '@test.com'
})
expect(res.status).toBe(201);
expect(res.text).toBe('User registered successfully');


})
});