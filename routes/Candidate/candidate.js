const express = require('express');
const { getRandomEvents, candidateBooking } = require('../../controllers/CalendarController');
const router = express.Router();

const {register, getCandidate, getSpecificCandidate, editCandidateInfo, IR56Eform, candidateIR56E, findCandidateIR56E, apt_test, index} = require("../../controllers/CandidateControllers");
// const {upload , deleteUpload, downloadFile} = require('../../controllers/UpDownload');
// const uploads = require('../../middlewares/updownload');
const authentication = require('../../middlewares/authentication');
const authorization = require('../../middlewares/authorization');

    

//new candidate registration and edit information
router.post('/register', register);     //register
router.post('/edit-candidate-info/:id', authentication, editCandidateInfo);   //edit information


// apt test
router.get('/apt-test/:id', apt_test);

// interview 
router.get('/:id/interview/:vid', getRandomEvents);
router.post('/:id/interview/:vid', candidateBooking);


//IR56E
router.get('/ir56eform/:id/:vid', IR56Eform);
router.post('/candidateIR56E/:id/:vid', candidateIR56E);  //create candidate IR56E database
router.get('/findCandidateIR56E/:id', findCandidateIR56E); //find specific-candidate IR56E


//get candidate information
router.get('/get-candidate', authentication, getCandidate);      // get all candidates id
router.get('/get-specific-candidate/:id', authentication, getSpecificCandidate);    //get specific candidate id


// router.post('/upload', uploads, authentication, upload);
// router.post('/delete-Upload', authentication, deleteUpload);
// router.post('/download', authentication, downloadFile);




module.exports = router;