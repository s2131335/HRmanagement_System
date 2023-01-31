/**
 * @api {get} /aptest/ImportExcel Import apt test question bank to database
 * @apiName GetImportExcel
 * @apiGroup AptTest
 * 
 * @apiDescription This API read /database/apt-test.xlsx file (saved in server), and import the questions into the database for generate apt test questions for candidates.
 *
 *
 * @apiSuccess {String}   status           ok
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {get} /aptest/getQuestion Randomly pick a set of questions from database
 * @apiName GetGetQuestion
 * @apiGroup AptTest
 * 
 * @apiDescription This API randomly picks one of three sets of questions from database
 *
 * @apiSuccess {String}   status           ok
 * @apiSuccess {Object[]}   QuestionSetNumber           List of Question objects
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {post} /aptest/checkAnswer/:id Check correctness of the candidates's answers
 * @apiName PostCheckAnswer
 * @apiGroup AptTest
 * 
 * @apiDescription This API check correctness of the candidates's answers, then update the apt test score of the candidate.
 *
 * @apiParam {String} id The id of the candidate
 *
 * @apiSuccess {String}   status           ok
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {get} /aptest/done Render apt test completed page
 * @apiName PostApttestDone
 * @apiGroup AptTest
 * 
 * @apiDescription This API Render apt test completed page after the candidate has submitted the apt test.
 *
 * @apiSuccess {String}   title           能力測試
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */