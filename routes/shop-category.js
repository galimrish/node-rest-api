const express = require('express');
const mongoose = require('mongoose');
const CommonApiMethods = require('../common-api-methods');
const dataSchemaHistory = require('../models/data-history');

const Model = require('../models/shop-category');
const ModelHistory = mongoose.model('shop-category-history', dataSchemaHistory);
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const {count, data} = await CommonApiMethods.get(Model, req.query);
    res.setHeader('x-total-count', count);
    res.json(data.map(s => ({id: s._id, name: s.name, code: s.code})));
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    await CommonApiMethods.post(Model, req.body);
    res.sendStatus(200);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await CommonApiMethods.put(Model, ModelHistory, {id: req.params.id, body: req.body});
    res.sendStatus(200);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await CommonApiMethods.delete(Model, ModelHistory, req.params.id);
    res.sendStatus(200);
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
});

router.get('/history', async (req, res) => {
  try {
    const {count, data} = await CommonApiMethods.getHistory(ModelHistory, req.query);
    res.setHeader('x-total-count', count);
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
