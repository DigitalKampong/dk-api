import request from 'supertest';
import app from '../../src/server';

describe('POST /stores', () => {
  it('creates a new store', async done => {
    const res = await request(app).post('/stores').send({name: 'best chicken rice'});
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('name', 'best chicken rice');
    done();
  });
});
