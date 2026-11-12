// tests/app.test.js
const request = require('supertest');
const app = require('../src/app');

describe('GET /health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /products', () => {
  it('returns 200 with an array of products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('each product has id, name and price', async () => {
    const res = await request(app).get('/products');
    res.body.forEach((p) => {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('name');
      expect(p).toHaveProperty('price');
    });
  });
});

describe('GET /products/:id', () => {
  it('returns 200 and the correct product for a valid id', async () => {
    const res = await request(app).get('/products/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body.name).toBe('Notebook');
  });

  it('returns 404 for a non-existent product', async () => {
    const res = await request(app).get('/products/999');
    expect(res.statusCode).toBe(404);
  });

  it('returns 400 for a non-numeric id', async () => {
    const res = await request(app).get('/products/abc');
    expect(res.statusCode).toBe(400);
  });
});
