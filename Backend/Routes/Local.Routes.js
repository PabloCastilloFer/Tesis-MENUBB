const express = require('express');
const router = express.Router();
const localController = require('../Controllers/Local.Controller.js');

router.get('/', localController.getLocals);
router.get('/:id', localController.getLocalById);
router.post('/', localController.createLocal);
router.put('/:id/schedule', localController.updateLocal);
router.delete('/:id', localController.deleteLocal);

module.exports = router;