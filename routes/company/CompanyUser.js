const { Router } = require('express');
const express = require('express');
const router = express.Router();
//const authentication = require('../middlewares/authentication');
const {register, newPosition,getPositions,getSpecificPosition,deletePosition,editPosition, index, newVacancy, editComp, editCompInfo} = require('../../controllers/CompanyUserControllers');
// const {upload,deleteUpload,downloadFile} = require('../../controllers/UpDownload');
const authentication = require('../../middlewares/authentication');
const authorization = require('../../middlewares/authorization');
const uploads = require('../../middlewares/updownload');

// Routes:
router.get('/', authentication,authorization("COM"), index);

router.post('/register', register);
router.get('/new-position',authorization("COM"), newVacancy);
router.post('/new-position',authorization("COM"), newPosition);
router.delete('/delete-position/:id',authorization("COM"), deletePosition);
router.post('/edit-position/:id',authorization("COM"), editPosition);

router.get('/get-position',authorization("COM"), getPositions);
router.get('/get-specific-position/:id',authorization("COM"),getSpecificPosition);

router.get('/edit', authorization("COM"), editComp);
router.post('/edit', authorization("COM"), editCompInfo);

////////////////////////////////////////////////////////////////
// router.post('/upload',authentication,authorization("COM"),uploads,upload);
// router.post('/delete-upload',authentication,authorization("COM"), deleteUpload);
// router.get('/download-file',authentication,authorization("COM"), downloadFile);

const UserCredential = require('../../database/models/UserCredential');
router.get('/test',(req,res)=>{
    UserCredential.find({username:"alan"}).populate('database',{companyName:1}).exec((err,doc)=>{console.log(doc[0].database.companyName)});
})
module.exports = router;
