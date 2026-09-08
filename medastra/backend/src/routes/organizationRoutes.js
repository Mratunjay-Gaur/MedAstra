const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/rbac');
const { ROLES } = require('../utils/constants');

router.use(protect);

router.post('/', checkRole([ROLES.ADMIN]), organizationController.createOrganization);
router.get('/:id', organizationController.getOrganizationById);
router.put('/:id', checkRole([ROLES.ADMIN]), organizationController.updateOrganization);

module.exports = router;
