const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/rbac');
const { ROLES } = require('../utils/constants');

router.use(protect);

router.get('/', checkRole([ROLES.ADMIN, ROLES.DOCTOR]), doctorController.getDoctors);
router.get('/:id', doctorController.getDoctorById);
router.put('/:id', checkRole([ROLES.ADMIN, ROLES.DOCTOR]), doctorController.updateDoctor);
router.get('/:id/patients', checkRole([ROLES.ADMIN, ROLES.DOCTOR]), doctorController.getDoctorPatients);

module.exports = router;
