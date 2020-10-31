import request from 'supertest';
import HawkerCentre from '../../src/models/HawkerCentre';
import Stall from '../../src/models/Stall';
import app from '../../src/server';

describe('POST /stalls', () => {
  it('returns a new stall', async () => {
    const res = await request(app).post('/stalls').send({name: 'best chicken rice'});

    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('name', 'best chicken rice');
  });

  it('returns an error given invalid attributes', async () => {
    const res = await request(app).post('/stalls').send({name: ''});

    expect(res.status).toEqual(400);
  });
});

describe('GET /stall/:id', () => {
  it('returns an existing store', async () => {
    const hcAttr = {name: 'fake name', address: 'fake addr'};
    const hawkerCentre = await HawkerCentre.create(hcAttr);
    const stall = await Stall.create({name: 'duck rice', hawkerCentreId: hawkerCentre.id});
    const res = await request(app).get(`/stalls/${stall.id}`);

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('name', 'duck rice');
    expect(res.body).toHaveProperty('HawkerCentre', hcAttr);
  });
});

describe('PUT /stall/:id', () => {
  it('returns an updated store', async () => {
    const hcAttr = {name: 'fake name', address: 'fake addr'};
    const hawkerCentre = await HawkerCentre.create(hcAttr);
    const stall = await Stall.create({name: 'duck rice', hawkerCentreId: hawkerCentre.id});
    const res = await request(app).put(`/stalls/${stall.id}`).send({name: 'noodles'});

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('name', 'noodles');
  });
});

describe('DELETE /stall/:id', () => {
  it('returns success on successful deletion', async () => {
    const stall = await Stall.create({name: 'duck rice'});
    const res = await request(app).delete(`/stalls/${stall.id}`);

    expect(res.status).toEqual(200);
    expect(await Stall.findByPk(stall.id)).toBeNull();
  });
})