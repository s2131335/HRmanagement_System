const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const {user_management, login, register, forget, reset_password, new_user, delete_user, edit_user} = require('../controllers/InternalUsersControllers');



module.exports = router;
