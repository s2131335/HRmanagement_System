const express = require('express');
const router = express.Router();
const authentication = require('../../middlewares/authentication');
const authorization = require('../../middlewares/authorization');
const uploads = require('../../middlewares/updownload');
const {companyUpload, candidateUpload, ir56eUpload ,cvView, jobadView, deleteJobad} = require('../../controllers/UpDownload');

router.post('/comp/:id',authentication,authorization("COM"),uploads,companyUpload);
router.post('/can/:id',uploads,candidateUpload);
router.get('/view/can/:id', authentication, cvView);
router.get('/view/vac/:id', authentication, authorization("COM"), jobadView);
// router.get('/delete/can/:id', authentication, authorization("CAN"), deleteCV);
router.post('/delete/vac/:id', authentication, authorization("COM"), deleteJobad);

router.post('/ir56e/:id',uploads,ir56eUpload);


module.exports = router;
