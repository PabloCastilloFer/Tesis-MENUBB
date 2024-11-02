const express = require('express');
const router = express.Router();

const localesRoutes = require('./Local.Routes.js');

router.use('/locales', localesRoutes);

module.exports = router;