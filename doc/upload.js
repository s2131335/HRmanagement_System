/**
 * @api {post} /upload/comp/:id Upload Job Description PDF
 * @apiName PostUploadJD
 * @apiGroup Up/Download
 * 
 * @apiDescription This API upload job description pdf and save it to database
 *
 *@apiParam {String} id  Id of selected job
 * 
 * @apiSuccess {String}   status           ok
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {post} /upload/can/:id Upload Candidate CV PDF
 * @apiName PostUploadCV
 * @apiGroup Up/Download
 * 
 * @apiParam {String} id Candidate Id
 * 
 * @apiDescription This API upload CV pdf and save it to database
 *
 *
 * @apiSuccess {String}   status           ok
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {get} /upload/view/can/:id Read Candidate CV PDF
 * @apiName GetViewCV
 * @apiGroup Up/Download
 * 
 * @apiParam {String} id Candidate Id
 * 
 * @apiDescription This API read CV pdf of selected candidate from database
 *
 *
 * @apiSuccess {Buffer}   tmp           PDF file buffer
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {get} /upload/view/vac/:id Read Job description PDF
 * @apiName GetViewJD
 * @apiGroup Up/Download
 * 
 * @apiParam {String} id  Id of selected job
 * 
 * @apiDescription This API read decription pdf of selected job from database
 *
 *
 * @apiSuccess {Buffer}   tmp           PDF file buffer
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {post} /upload/delete/vac/:id Delete Job description PDF
 * @apiName PostDeleteJD
 * @apiGroup Up/Download
 * 
 * @apiParam {String} id  Id of selected job
 * 
 * @apiDescription This API delete decription pdf of selected job from database
 *
 *
 * @apiSuccess {String}   status          ok
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {post} /upload/ir56e/:id Upload supporting documents for IR56E
 * @apiName PostIr56eDoc
 * @apiGroup Up/Download
 * 
 * @apiParam {String} id  Id candidate
 * 
 * @apiDescription This API upload supporting document pdf for IR56E to database.
 *
 *
 * @apiSuccess {String}   status          ok
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */