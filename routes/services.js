const express = require('express');
const {
  getServices,
  getService,
  createService,
  updateService,
  deleteService
} = require('../controllers/services');

// Middleware
const authentication = require('../middleware/authentication');

const router = new express.Router();

router
  .route('/')
  .get(getServices)
  .post(authentication, createService);

router
  .route('/:id')
  .get(authentication, getService)
  .patch(authentication, updateService)
  .delete(authentication, deleteService);

module.exports = router;
