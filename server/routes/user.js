const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.get('/users', userCtrl.getAllUser);
router.post('/login', userCtrl.login);
router.post('/register', userCtrl.signup);
router.post('/change-password', userCtrl.changePassword);

module.exports = router;
