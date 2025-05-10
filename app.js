const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

const eventoRoutes = require('./routes/eventoRoutes');
app.use('/api/events', eventoRoutes);

const ingressoRoutes = require('./routes/ingressoRoutes');
app.use('/api/tickets', ingressoRoutes);

const compraRoutes = require('./routes/compraRoutes');
app.use('/api/purchase', compraRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/users', authRoutes);


module.exports = app;
