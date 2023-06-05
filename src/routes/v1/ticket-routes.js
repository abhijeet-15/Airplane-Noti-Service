const express = require('express');

const { EmailController } = require('../../controllers')

const router = express.Router();

// /api/v1/airplanes POST
router.post('/',EmailController.create);

module.exports = router;