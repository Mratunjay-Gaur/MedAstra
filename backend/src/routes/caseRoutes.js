const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/', caseController.createCase);
router.get('/:id', caseController.getCase);
router.put('/:id', caseController.updateCase);

module.exports = router;
