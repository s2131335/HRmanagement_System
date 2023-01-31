const express = require('express');
const {importExcel, getQuestion, checkAnswer} = require('../../controllers/AptestControllers');
const router = express.Router();



// router.post('/getQuestion', getQuestion);

router.get('/ImportExcel', importExcel);
router.get('/getQuestion', getQuestion);
router.post('/checkAnswer/:id', checkAnswer);
router.get('/done', (req, res)=>{
    res.render('apttest/finish', {title: "能力測試"})
});

module.exports = router;
