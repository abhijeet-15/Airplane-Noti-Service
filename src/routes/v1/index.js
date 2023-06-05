const express = require('express');

const { InfoController } = require('../../controllers');
const ticketRoutes = require('./ticket-routes');

const router = express.Router();

router.get('/info', InfoController.info)
router.use('/tickets',ticketRoutes);

module.exports =  router;