require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const branch = require('./routes/branch');
const business_area = require('./routes/business-area');
const merchandise = require('./routes/merchandise');
const nomenclature = require('./routes/nomenclature');
const pickup_point = require('./routes/pickup-point');
const pickup_point_type = require('./routes/pickup-point-type');
const shop_category = require('./routes/shop-category');
const shop_segment = require('./routes/shop-segment');
const shop = require('./routes/shop');

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error);
});
database.once('connected', () => {
  console.log('Database Connected');
});

const app = express();
app.use(cors({
  origin: 'http://localhost:4200',
  exposedHeaders: 'x-total-count'
}));
app.use(express.json());

app.use('/api/branch', branch);
app.use('/api/business-area', business_area);
app.use('/api/merchandise', merchandise);
app.use('/api/nomenclature', nomenclature);
app.use('/api/pickup-point', pickup_point);
app.use('/api/pickup-point-type', pickup_point_type);
app.use('/api/shop-category', shop_category);
app.use('/api/shop-segment', shop_segment);
app.use('/api/shop', shop);

app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});