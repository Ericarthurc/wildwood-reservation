const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

// Middleware
const authentication = require('../middleware/authentication');

const router = new express.Router();

router
  .route('/')
  .get(authentication, getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(authentication, getUser)
  .patch(authentication, updateUser)
  .delete(authentication, deleteUser);

module.exports = router;
