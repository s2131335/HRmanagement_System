

/**
 * @api {post} /candidate/register   Create a new Candidate
 * @apiName CreaateNewCandidate
 * @apiGroup Candidate
 * @apiPermission none
 * 
 * @apiSuccess status       ok  
 * @apiSuccess cid          credential id
 * 
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 * @apiError {String} Error message   Cannot find the candidate
 */

/**
 * @api {post} /candidate/edit-candidate-info/:id       Edit data of a candidate
 * @apiName EditCandidate
 * @apiGroup Candidate
 * @apiPermission Candidate
 * 
 * @apiParam {String} id   The id of the candidate
 * 
 * @apiSuccess status   ok
 * 
 * @apiError {String} Error message   Cannot find the candidate
 */

/**
 * @api {get} /candidate/apt-test/:id       Generate an apt test for a Candidate
 * @apiName GenApt-test
 * @apiGroup Candidate
 * @apiPermission Candidate
 * 
 * @apiParam {String}               id The id of the candidate
 * 
 * @apiSuccess {String} title       候選人才能力測驗
 * @apiSuccess {String} test        Apt test question
 * @apiSuccess {String} candidateID     ID of the candidate
 * 
 * @apiError (500 Internal Server Error) Not found      Cannot find Question Set of the apt test
 */

/**
 * @api {get} /candidate/:id/interview/:vid     Select interview time-slot for the candidate
 * @apiName GetInterviewTime
 * @apiGroup Candidate
 * @apiPermission Candidate
 * 
 * @apiParam {String} id        id of the candidate
 * @apiParam {String} vid       Vacancy id of the position
 * 
 * @apiSuccess {String} title       選擇面試時間段
 * @apiSuccess {array} random       random interview time-slot
 * @apiSuccess {String} pos         id of the Position provided from the company
 * @apiSuccess {String} can         id of the Candidate
 * @apiSuccess {Boolean} booked     The time-slot is not booked
 * 
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error 
 */

/**
 * @api {post} /candidate/:id/interview/:vid        Check booking for the candidate
 * @apiName FindCandidateBooking
 * @apiGroup Candidate
 * @apiPermission Candidate
 * 
 * @apiParam {String} id   id of the candidate
 * @apiParam {String} vid  vacancy id of the position
 * 
 * @apiSuccess {String} status      ok
 * 
 * @apiError (500 Internal Server Error)Not found       時間段選擇時出現未知錯誤
 */

/**
 * @api {get} /candidate/ir56eform/:id/:vid         Generate IR56eform for the candidate
 * @apiName GenIR56Eform 
 * @apiGroup Candidate
 * @apiPermission Candidate
 * 
 * @apiParam {String} id    id of the candidate
 * @apiParam {String} vid   vacancy id of position
 * 
 * @apiSuccess {String} title   ir56e表格
 * @apiSuccess {String} cid     id of the candidate
 * @apiSuccess {String} vid     Vacancy id of position
 */

/**
 * @api {post} /candidate/candidateIR56E/:id/:vid       Fill the IR56Eform for the candidate
 * @apiName FillIR56E
 * @apiGroup Candidate
 * @apiPermission Candidate
 * 
 * @apiParam {String} id    id of the candidate
 * @apiParam {String} vid   vacancy id of position
 * 
 * @apiSuccess status   ok
 * 
 * @apiError {String} error message    Error sending email
 */

/**
 * @api {get} /candidate/findCandidateIR56E/:id         Search the IR56Eform for the candidate
 * @apiName FindCandidateIR56E
 * @apiGroup Candidate
 * @apiPermission Candidate
 * 
 * @apiParam {String} id id of the candidate
 * 
 * @apiSuccess status ok
 * @apiSuccess {Object} IR56E    The IR56E form of the candidate
 * 
 * @apiError (500 Internal Server Error) Cannot find candidate
 */




