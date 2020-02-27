const express = require('express');
const {
  getAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin
} = require('../controllers/admins');

// Middleware
const authentication = require('../middleware/authentication');

const router = express.Router();

router
  .route('/')
  .get(getAdmins)
  .post(createAdmin);

router
  .route('/:id')
  .get(getAdmin)
  .patch(updateAdmin)
  .delete(deleteAdmin);

router.route('/login').post(loginAdmin);

module.exports = router;
