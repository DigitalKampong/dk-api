import request from 'supertest';
import app from '../../src/server';

describe('POST /stalls', () => {
  it('creates a new stall', async done => {
    const res = await request(app).post('/stalls').send({name: 'best chicken rice'});
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('name', 'best chicken rice');
    done();
  });
});

describe('GET /stall/:id', () => {

})
