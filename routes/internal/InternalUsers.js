const express = require('express');
const router = express.Router();
const authentication = require('../../middlewares/authentication');
const authorization = require('../../middlewares/authorization');
const {user_management, new_user, delete_user, edit_user, account, getAllPositions, getSpecificPosition,user_calendar, matchVacancy, getAllCandidates, vacancy_management, toCsv, sendTests, vacancyInfo, vacancyShorlisted, vacancyInterview, getinterview, getShortlisted, sendInterview,removeFromShortlisted,removeFromInterviewed,sendIr56e, email_template, update_email_template, update_email_logo, candidate_management, getAllCan, deleteCandidate} = require('../../controllers/InternalUsersControllers');
const uploads = require('../../middlewares/updownload');
router.all('*',authentication,authorization("ADMIN"));
// Routes:
router.get('/user-management', user_management);
router.get('/account', account);
router.get('/new-user', new_user);
router.put('/edit-user' ,edit_user);
router.delete('/delete-user/:username', delete_user);

// email
router.get('/email-template',email_template);
router.post('/email-template', update_email_template);
router.post('/email-template-logo', uploads, update_email_logo);

/////////////// vacancy page /////////////
router.get('/vacancy-management', vacancy_management);
router.get('/vacancy/info/:id', vacancyInfo);
router.get('/vacancy/match/:id', matchVacancy); // look for candidates to shortlist
router.post('/sendtests/:id', sendTests);
router.get('/vacancy/:id/shortlisted', vacancyShorlisted); // look for candidates for interview
router.delete('/vacancy/:id/shortlisted/:cid', removeFromShortlisted); // remove candidate from shortlist
router.post('/vacancy/:id/shortlisted/:cid', sendInterview); // select candidate for interview
router.get('/vacancy/:id/interview', vacancyInterview); // look for successful match
router.delete('/vacancy/:id/interview/:cid', removeFromInterviewed); // unsuccessful match after interview
router.post('/vacancy/:id/interview/:cid', sendIr56e); // get successful match and send ier56
router.post('/getCsv',toCsv);


router.get('/get-candidates/:id', getAllCandidates);
router.get('/get-shortlisted/:id', getShortlisted);
router.get('/get-interview/:id', getinterview);
router.get('/get-positions',getAllPositions);
// router.get('/get-specific-position/:id',getSpecificPosition);

///////////// calendar //////////////
router.get('/user-calendar', user_calendar);


///////////// candidate //////////////
router.get('/candidate-management', authentication, candidate_management);
router.get('/get-all-candidates', authentication, getAllCan);
router.post('/delete-candidate/:id', authentication, deleteCandidate)

module.exports = router;
