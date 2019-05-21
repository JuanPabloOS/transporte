const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/signup', UserController.signUp);
router.post('/login',UserController.logIn);
router.post('/registrarBus',UserController.registrarBus);
module.exports = router;