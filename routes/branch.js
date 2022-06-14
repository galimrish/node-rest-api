const express = require('express');
const mongoose = require('mongoose');
const CommonApiMethods = require('../common-api-methods');
const dataSchemaHistory = require('../models/data-history');

const AddressModel = require('../models/address').dataModel;
const BranchModel = require('../models/branch');
const ModelHistory = mongoose.model('branch-history', dataSchemaHistory);
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const {count, data} = await CommonApiMethods.get(BranchModel, req.query);
    res.setHeader('x-total-count', count);
    res.json(data.map(s => ({id: s._id, name: s.name, address: s.address})));
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const {name} = req.body;
    const dublicate = await BranchModel.find({name});
    if (dublicate.length) {
      throw new Error(`'${name}' already exists`);
    }

    const addressModel =  new AddressModel({ ...req.body.address });
    const address = await addressModel.save();

    const data = new BranchModel({ name, address, creationDate: new Date() });
    await data.save();

    res.sendStatus(200);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await CommonApiMethods.put(BranchModel, ModelHistory, {id: req.params.id, body: req.body});
    res.sendStatus(200);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await CommonApiMethods.delete(BranchModel, ModelHistory, req.params.id);
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
