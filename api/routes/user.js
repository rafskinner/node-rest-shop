const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/check-auth');
const userController = require('../controllers/user');

router.post('/signup', userController.signupUser);

router.post('/login', userController.loginUser);

router.delete('/:id', checkAuth, userController.deleteUser);

module.exports = router;