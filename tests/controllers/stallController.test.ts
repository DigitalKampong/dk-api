import request from 'supertest';
import HawkerCentre from '../../src/models/HawkerCentre';
import Stall from '../../src/models/Stall';
import HawkerCentreFact from '../factories/HawkerCentreFactory';
import StallFact from '../factories/StallFactory';
// import StallFactory from '../factories/StallFactory';

import app from '../../src/server';

describe('POST /stalls', () => {
  it('returns a new stall', async () => {
    const hawkerCentre = await HawkerCentreFact.create();
    const res = await request(app)
      .post('/stalls')
      .send({name: 'best chicken rice', hawkerCentreId: hawkerCentre.id});

    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('name', 'best chicken rice');
  });

  it('returns an error given invalid attributes', async () => {
    // Change the error code once we figure out a way to handle user errors gracefully
    // it is now caught by the general error handler. The general error handler uses console.error so we hide it away for now.
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const res = await request(app).post('/stalls').send({name: ''});

    expect(res.status).toEqual(500);
    spy.mockRestore();
  });
});

describe('GET /stall/:id', () => {
  it('returns an existing store', async () => {
    const stall = await StallFact.create();
    const hc = await stall.getHawkerCentre();
    const res = await request(app).get(`/stalls/${stall.id}`);

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('name', stall.name);
    expect(res.body).toHaveProperty('HawkerCentre', {name: hc.name, address: hc.address});
  });
});

describe('PUT /stall/:id', () => {
  it('returns an updated store', async () => {
    const stall = await StallFact.create();
    const res = await request(app).put(`/stalls/${stall.id}`).send({name: 'noodles'});

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('name', 'noodles');
  });
});

describe('DELETE /stall/:id', () => {
  it('returns success on successful deletion', async () => {
    const stall = await StallFact.create();
    const res = await request(app).delete(`/stalls/${stall.id}`);

    expect(res.status).toEqual(200);
    expect(await Stall.findByPk(stall.id)).toBeNull();
  });
});
