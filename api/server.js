const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let products = [];
let currentId = 1;

app.get('/products', (req, res) => res.json(products));

app.post('/products', (req, res) => {
  const product = { id: currentId++, ...req.body };
  products.push(product);
  res.status(201).json(product);
});

app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id == id);

  if (index !== -1) {
    products[index] = { id: Number(id), ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).send('Produto não encontrado');
  }
});

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter((p) => p.id != id);
  res.status(204).send();
});

app.listen(3000, () => console.log('API rodando na porta 3000'));
