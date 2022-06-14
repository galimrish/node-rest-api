const express = require('express');
const mongoose = require('mongoose');
const CommonApiMethods = require('../common-api-methods');
const dataSchemaHistory = require('../models/data-history');

const ShopModel = require('../models/shop');
const ShopCategoryModel = require('../models/shop-category');
const MerchandiseModel = require('../models/merchandise');
const ModelHistory = mongoose.model('shop-history', dataSchemaHistory);
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const {count, data} = await CommonApiMethods.get(ShopModel, req.query);
    res.setHeader('x-total-count', count);
    res.json(data.map(s => ({...s, id: s._id})));
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const {shopCategory, merchandise} = req.body;
    let type = await ShopCategoryModel.find({name: shopCategory});
    if (!type.length) {
      throw new Error(`Shop category '${shopCategory}' doesn't exist`);
    }
    type = await MerchandiseModel.find({name: merchandise});
    if (!type.length) {
      throw new Error(`Merchandise '${merchandise}' doesn't exist`);
    }

    await CommonApiMethods.post(ShopModel, req.body);
    res.sendStatus(200);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const {shopCategory, merchandise} = req.body;
    let type = await ShopCategoryModel.find({name: shopCategory});
    if (!type.length) {
      throw new Error(`Shop category '${shopCategory}' doesn't exist`);
    }
    type = await MerchandiseModel.find({name: merchandise});
    if (!type.length) {
      throw new Error(`Merchandise '${merchandise}' doesn't exist`);
    }

    await CommonApiMethods.put(ShopModel, ModelHistory, {id: req.params.id, body: req.body});
    res.sendStatus(200);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await CommonApiMethods.delete(ShopModel, ModelHistory, req.params.id);
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
