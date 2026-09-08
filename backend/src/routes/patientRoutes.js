const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/rbac');
const { ROLES } = require('../utils/constants');

router.use(protect);

router.post('/', patientController.createPatient);
router.get('/', checkRole([ROLES.ADMIN, ROLES.DOCTOR]), patientController.getPatients);
router.get('/:id', patientController.getPatientById);
router.put('/:id', patientController.updatePatient);

module.exports = router;
