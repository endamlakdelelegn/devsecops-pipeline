// src/app.js – ShopCart API (Assignment 6)
const express = require('express');

const app = express();
app.use(express.json());

// Endpoint 1 – health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'devsecops-pipeline' });
});

// Endpoint 2 – list products (static data, no DB needed for this assignment)
app.get('/products', (req, res) => {
  const products = [
    { id: 1, name: 'Notebook', price: 5.99 },
    { id: 2, name: 'Pen',      price: 1.49 },
  ];
  res.json(products);
});

// Endpoint 3 – get product by id
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid product id' });
  }
  const products = [
    { id: 1, name: 'Notebook', price: 5.99 },
    { id: 2, name: 'Pen',      price: 1.49 },
  ];
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

const PORT = process.env.PORT || 3000;

// Only start listening when run directly (not when required by tests)
if (require.main === module) {
  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
}

module.exports = app;
