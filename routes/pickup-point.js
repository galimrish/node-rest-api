const express = require('express');
const mongoose = require('mongoose');
const CommonApiMethods = require('../common-api-methods');
const dataSchemaHistory = require('../models/data-history');

const PickupPointModel = require('../models/pickup-point');
const PickupPointTypeModel = require('../models/pickup-point-type');
const ModelHistory = mongoose.model('pickup-point-history', dataSchemaHistory);
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const {count, data} = await CommonApiMethods.get(PickupPointModel, req.query);
    res.setHeader('x-total-count', count);
    res.json(data.map(s => ({...s, id: s._id})));
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const {pickupPointTypeName} = req.body;
    let type = await PickupPointTypeModel.find({name: pickupPointTypeName});
    if (!type.length) {
      throw new Error(`Pickup point type '${pickupPointTypeName}' doesn't exist`);
    }

    await CommonApiMethods.post(PickupPointModel, req.body);
    res.sendStatus(200);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const {pickupPointTypeName} = req.body;
    let type = await PickupPointTypeModel.find({name: pickupPointTypeName});
    if (!type.length) {
      throw new Error(`Pickup point type '${pickupPointTypeName}' doesn't exist`);
    }

    await CommonApiMethods.put(PickupPointModel, ModelHistory, {id: req.params.id, body: req.body});
    res.sendStatus(200);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await CommonApiMethods.delete(PickupPointModel, ModelHistory, req.params.id);
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
