const express = require('express');
const router = express.Router();
const authentication = require('../../middlewares/authentication');
const {login, register, forget, reset_password,logout} = require('../../controllers/LoginAndRegController.js');

router.post('/login', login);
router.post('/register', register);
router.get('/logout',logout);
router.put('/forget', forget);
router.post('/reset-password', reset_password);

module.exports = router;
