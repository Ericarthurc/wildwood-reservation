const express = require('express');
const {
  getServices,
  getService,
  createService,
  updateService,
  deleteService
} = require('../controllers/services');

const router = express.Router();

router
  .route('/')
  .get(getServices)
  .post(createService);

router
  .route('/:id')
  .get(getService)
  .patch(updateService)
  .delete(deleteService);

module.exports = router;
