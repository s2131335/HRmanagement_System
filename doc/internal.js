/**
 * @api {get} /internal/user-management Render User Management page
 * @apiName GetUserManagement
 * @apiGroup Internal-User
 * @apiPermission ADMIN
 *
 *
 * @apiSuccess {String}   title            人力資源系統
 * @apiSuccess {Object[]} users            List of internal users
 * @apiSuccess {Object}   cur_user         Object of the current user
 *
 * @apiError NotPermitted  Only authenticated Admins can access the data.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {get} /internal/new-user Render New User page
 * @apiName GetNewUser
 * @apiGroup Internal-User
 * @apiPermission ADMIN
 *
 *
 * 
 * @apiSuccess {String}   title            新增用戶
 *
 * @apiError NotPermitted  Only authenticated Admins can access the data.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {put} /internal/edit-user Edit selected user
 * @apiName PutEditUser
 * @apiGroup Internal-User
 * @apiPermission ADMIN
 *
 *
 * @apiSuccess  status   "ok"
 *
 * @apiError NotPermitted  Only authenticated Admins can access the data.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {delete} /internal/delete-user/:username   Delete selected user
 * @apiName DeleteDeleteUser
 * @apiGroup Internal-User
 * @apiPermission ADMIN
 *
 * 
 * @apiParam {String} username  The username of user to be deleted
 * 
 *
 * @apiSuccess  status   "ok"
 *
 * @apiError NotPermitted  Only authenticated Admins can access the data.
 * @apiError (500 Internal Server Error) Not found  Cannot found selected user
 *
 */

/**
 * @api {get} /internal/account   Render account information page
 * @apiName GetAccount
 * @apiGroup Internal-User
 * @apiPermission ADMIN
 *
 * 
 *
 * @apiSuccess {String}   title            帳戶
 * @apiSuccess {String} role           Role of current user
 * @apiSuccess {String} username            Username of current user
 * @apiSuccess {Object}   cur_user         Object of the current user
 *
 * @apiError NotPermitted  Only authenticated Admins can access the data.
 * @apiError (500 Internal Server Error) Not found  Cannot found selected user
 *
 */

/**
 * @api {get} /internal/vacancy-management Render Vacancy Management page
 * @apiName GetVacancyManagement
 * @apiGroup Internal-Vacancy
 * @apiPermission ADMIN
 *
 *
 * @apiSuccess {String}   title            人力資源系統
 * @apiSuccess {String} role            Role of the current user
 * @apiSuccess {Object}   cur_user         Object of the current user
 *
 * @apiError NotPermitted  Only authenticated Admins can access the data.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {get} /internal/vacancy/info/:id  Render Vacancy Infomation
 * @apiName GetVacancyInfo
 * @apiGroup Internal-Vacancy
 * @apiPermission ADMIN
 *
 * 
 * @apiParam {String} id The id of the selected vacancy
 * 
 * @apiSuccess {String}   title            空缺匹配
 * @apiSuccess {Object}   cur_user         Object of the current user
 * @apiSuccess {Object}   onePosition         Object of position from the database
 * @apiSuccess {Object}   position_data         Object of position with limited fields
 * @apiSuccess {String[]}   study1         List of uppper half of the study[]
 * @apiSuccess {String[]}   study2         List of lower half of the study[]
 *
 * @apiError NotPermitted  Only authenticated Admins can access the data.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {get} /internal/vacancy/match/:id  Render Vacancy-Candidate matches
 * @apiName GetVacancyMatch
 * @apiGroup Internal-Vacancy
 * @apiPermission ADMIN
 *
 * 
 * @apiParam {String} id The id of the selected vacancy
 * 
 * @apiSuccess {String}   title            空缺匹配
 * @apiSuccess {Object}   cur_user         Object of the current user
 * @apiSuccess {Object}   onePosition         Object of position from the database
 * @apiSuccess {String[]}   study1         List of uppper half of the study[]
 * @apiSuccess {String[]}   study2         List of lower half of the study[]
 *
 * @apiError NotPermitted  Only authenticated Admins can access the data.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {post} /internal/sendtests/:id  Send apt test to matched candidates
 * @apiName PostSendTest
 * @apiGroup Internal-Vacancy
 * @apiPermission ADMIN
 *
 * 
 * @apiParam {String} id The id of the selected vacancy
 * 
 * @apiBody {Object}  filter Object of matching filters
 * 
 * @apiSuccess {String}   status            ok
 * @apiSuccess {String}   message           至今已發送 sent/total 能力測試!
 *
 * @apiError NotPermitted  Only authenticated Admins can access the data.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {get} /internal/vacancy/:id/shortlisted  Render shortlisted candidates
 * @apiName GetVacancyShortlisted
 * @apiGroup Internal-Vacancy
 * @apiPermission ADMIN
 *
 * 
 * @apiParam {String} id The id of the selected vacancy
 * 
 * @apiSuccess {String}   title            空缺匹配
 * @apiSuccess {Object}   cur_user         Object of the current user
 * @apiSuccess {Object}   onePosition         Object of position from the database
 * @apiSuccess {String[]}   study1         List of uppper half of the study[]
 * @apiSuccess {String[]}   study2         List of lower half of the study[]
 *
 * @apiError NotPermitted  Only authenticated Admins can access the data.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {delete} /internal/vacancy/:id/shortlisted/:cid  Delete a shortlisted candidate
 * @apiName DeleteVacancyShortlisted
 * @apiGroup Internal-Vacancy
 * @apiPermission ADMIN
*
* 
* @apiParam {String} id The id of the selected vacancy
* @apiParam {String} cid The id of the selected candidate
* 
* @apiSuccess {String}   status            ok
* @apiSuccess {String}   message           Deleted!
*
* @apiError NotPermitted  Only authenticated Admins can access the data.
* @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
*
*/

/**
 * @api {post} /internal/vacancy/:id/shortlisted/:cid  Send interview invitation to a shortlisted candidate
 * @apiName PostVacancyShortlisted
 * @apiGroup Internal-Vacancy
 * @apiPermission ADMIN
*
* 
* @apiParam {String} id The id of the selected vacancy
* @apiParam {String} cid The id of the selected candidate
* 
* @apiSuccess {String}   status            ok
* @apiSuccess {String}   message           至今已發送 sent/total 能力測試!
*
* @apiError NotPermitted  Only authenticated Admins can access the data.
* @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
*
*/

/**
 * @api {get} /internal/vacancy/:id/interview  Render candidates who have been invited to the interview
 * @apiName GetVacancyInterviewed
 * @apiGroup Internal-Vacancy
 * @apiPermission ADMIN
 *
 * 
 * @apiParam {String} id The id of the selected vacancy
 * 
 * @apiSuccess {String}   title            空缺匹配
 * @apiSuccess {Object}   cur_user         Object of the current user
 * @apiSuccess {Object}   onePosition         Object of position from the database
 * @apiSuccess {String[]}   study1         List of uppper half of the study[]
 * @apiSuccess {String[]}   study2         List of lower half of the study[]
 *
 * @apiError NotPermitted  Only authenticated Admins can access the data.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {delete} /internal/vacancy/:id/interview/:cid  Delete a candidate from interview list
 * @apiName DeleteVacancyInterviewed
 * @apiGroup Internal-Vacancy
 * @apiPermission ADMIN
*
* 
* @apiParam {String} id The id of the selected vacancy
* @apiParam {String} cid The id of the selected candidate
* 
* @apiSuccess {String}   status            ok
* @apiSuccess {String}   message           Deleted!
*
* @apiError NotPermitted  Only authenticated Admins can access the data.
* @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
*
*/

/**
 * @api {post} /internal/vacancy/:id/interview/:cid  Send ir56e form to a interviewed candidate
 * @apiName PostVacancyInterviewed
 * @apiGroup Internal-Vacancy
 * @apiPermission ADMIN
* 
* @apiParam {String} id The id of the selected vacancy
* @apiParam {String} cid The id of the selected candidate
* 
* @apiSuccess {String}   status            ok
* @apiSuccess {String}   message           至今已發送 sent/total 能力測試!
*
* @apiError NotPermitted  Only authenticated Admins can access the data.
* @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
*
*/

/**
 * @api {post} /internal/getCsv  Generate CSV of matched candidates
 * @apiName PostGetCsv
 * @apiGroup Internal-Vacancy
 * @apiPermission ADMIN
*
* @apiBody {Object}  filter Object of matching filters
*
* @apiSuccess {Buffer}   data            csv file for download
*
* @apiError NotPermitted  Only authenticated Admins can access the data.
* @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
*
*/

/**
 * @api {get} /internal/get-candidates/:id  Show all candidates in seperate pages
 * @apiName GetGetCandidates
 * @apiGroup Internal-Vacancy
 * @apiPermission ADMIN
 *
 * 
 * @apiParam {String} id The id of the selected vacancy
 * draw: parseInt(req.query.draw), recordsTotal: filteredCount, recordsFiltered: filteredCount, data:cans
 * 
 * @apiSuccess {Number}   recordsTotal         Total number of records
 * @apiSuccess {Number}   recordsFiltered         Number of records filtered
 * @apiSuccess {Object[]}   data         List of candidate objects from database
 *
 * @apiError NotPermitted  Only authenticated Admins can access the data.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {get} /internal/get-shortlisted/:id  Show all shortlisted candidates in seperate pages
 * @apiName GetGetShortlisted
 * @apiGroup Internal-Vacancy
 * @apiPermission ADMIN
 *
 * 
 * @apiParam {String} id The id of the selected vacancy
 * draw: parseInt(req.query.draw), recordsTotal: filteredCount, recordsFiltered: filteredCount, data:cans
 * 
 * @apiSuccess {Number}   recordsTotal         Total number of records
 * @apiSuccess {Number}   recordsFiltered         Number of records filtered
 * @apiSuccess {Object[]}   data         List of candidate objects from database
 *
 * @apiError NotPermitted  Only authenticated Admins can access the data.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {get} /internal/get-interview/:id  Show all candidates that are invited to the interview in seperate pages
 * @apiName GetGetInterviewed
 * @apiGroup Internal-Vacancy
 * @apiPermission ADMIN
 *
 * 
 * @apiParam {String} id The id of the selected vacancy
 * draw: parseInt(req.query.draw), recordsTotal: filteredCount, recordsFiltered: filteredCount, data:cans
 * 
 * @apiSuccess {Number}   recordsTotal         Total number of records
 * @apiSuccess {Number}   recordsFiltered         Number of records filtered
 * @apiSuccess {Object[]}   data         List of candidate objects from database
 *
 * @apiError NotPermitted  Only authenticated Admins can access the data.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {get} /internal/get-positions  Show all positions in separated pages
 * @apiName GetGetIPositions
 * @apiGroup Internal-Vacancy
 * @apiPermission ADMIN
 *
 * 
 * 
 * @apiSuccess {Number}   recordsTotal         Total number of records
 * @apiSuccess {Number}   recordsFiltered         Number of records filtered
 * @apiSuccess {Object[]}   data         List of position objects from database
 *
 * @apiError NotPermitted  Only authenticated Admins can access the data.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {get} /internal/user-calendar  Render calendar page
 * @apiName GetUserCalendar
 * @apiGroup Internal-Calendar
 * @apiPermission ADMIN
 *
 * 
 * 
 * @apiSuccess {String}   title         面試預約月歷
 * @apiSuccess {Object}   cur_user        Object of the current user
 *
 * @apiError NotPermitted  Only authenticated Admins can access the data.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {get} /internal/email-template  Render email template page
 * @apiName GetEmailTemplate  
 * @apiGroup Internal-Email
 * @apiPermission ADMIN
 *
 * @apiDescription Read email template JSON "/email/text.json", and render email template
 * 
 * @apiSuccess {JSON}   email_text         JSON of the email template settings
 *
 * @apiError NotPermitted  Only authenticated Admins can access the data.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {post} /internal/email-template  Update email template
 * @apiName PostEmailTemplate  
 * @apiGroup Internal-Email
 * @apiPermission ADMIN
 *
 * @apiDescription Update email template JSON "/email/text.json".
 * 
 * @apiSuccess {JSON}   email_text         JSON of the email template settings
 *
 * @apiError NotPermitted  Only authenticated Admins can access the data.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {post} /internal/email-template-logo  Upload logo to email template
 * @apiName PostEmailTemplateLogo  
 * @apiGroup Internal-Email
 * @apiPermission ADMIN
 *
 * @apiDescription Save uploaded logo as "/public/image/email-logo.png".
 * 
 * @apiSuccess {String}   status         ok
 *
 * @apiError NotPermitted  Only authenticated Admins can access the data.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {get} /internal/candidate-management   Render candidate management page
 * @apiName GetCandidateManagement
 * @apiGroup Internal-Candidate
 * @apiPermission Admin
 * 
 * @apiSuccess {String} title      候選人才管理
 * @apiSuccess {Object}  cur_user    Object of the current user
 * 
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 */

/**
 * @api {get} /internal/get-all-candidates          Search for all candidates
 * @apiName GetAllCandidate
 * @apiGroup Internal-Candidate
 * @apiPermission Admin
 * 
 * @apiBody {Object} filter Object of filter
 * 
 * @apiSuccess {Number} recordsFiltered   Number of records filtered
 * @apiSuccess {Number} recordsTotal   Total number of records
 * @apiSuccess {Object[]} data   List of Candidate objects
 * 
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 */

/**
 * @api {post} /internal/delete-candidate/:id         Delete a candidate
 * @apiName PostDeleteCandidate
 * @apiGroup Internal-Candidate
 * @apiPermission Admin
 * 
 * @apiParam {String} id id of the candidate
 * 
 * @apiSuccess status ok 
 * 
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 */
