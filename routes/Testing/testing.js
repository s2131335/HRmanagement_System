const express = require('express');
const router = express.Router();
const {generateCans, generateComps, generateVacancies, deleteAllCans, deleteAllComps, deleteAllVacs,createAdmin} = require("../../controllers/Testing.js");

router.get('/gen-can/:no', generateCans);
router.get('/gen-comp/:no', generateComps);
router.get('/gen-vac/:cid/:no', generateVacancies);
router.get('/deleteAll-can', deleteAllCans);
router.get('/deleteAll-comp', deleteAllComps);
router.get('/deleteAll-vacs/:cid', deleteAllVacs);
router.get('/createAdmin', createAdmin);

module.exports = router;
