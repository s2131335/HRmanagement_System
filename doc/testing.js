/**
 * @api {get} /gen-can/:no  Create random candidate
 * @apiName generateCans
 * @apiGroup Testing
 * @apiPermission None
 * @apiDescription This API create random candidatev record 
 * 
 * @apiParam {Integer} no The number of candidate record needed to create
 * 
 * @apiSuccess {String} status Succesfully created apiParam:no random candidates!
 *
 * @apiError {String} status error
 */

/**
 * @api {get} /gen-comp/:no  Create random company
 * @apiName generateComps
 * @apiGroup Testing
 * @apiPermission None
 * @apiDescription This API create random company record 
 *
 * @apiParam {Integer} no The number of company record needed to create
 * 
 * @apiSuccess {String} status Succesfully created apiParam:no random companies!
 *
 * @apiError {String} status error
 */

/**
 * @api {get} /gen-vac/:cid/:no  Create random vacancy record for specific company
 * @apiName generateVacancies
 * @apiGroup Testing
 * @apiPermission None
 * @apiDescription This API create random vacancy record for specific company
 *
 * @apiParam {String} cid The id of the company
 * @apiParam {Integer} no The number of company record needed to create
 * 
 * @apiSuccess {String} status Succesfully created apiParam:no random vacancies for companyName
 *
 * @apiError {String} status error
 */

/**
 * @api {get} /deleteAll-can Delete all candidate record
 * @apiName deleteAllCans
 * @apiGroup Testing
 * @apiPermission None
 * @apiDescription This API delete all candidate record
 * 
 * @apiSuccess {String} status Succesfully deleted numberOfCandidate candidates
 *
 * @apiError {String} status error
 */

/**
 * @api {get} /deleteAll-comp Delete all company record
 * @apiName deleteAllComps
 * @apiGroup Testing
 * @apiPermission None
 * @apiDescription This API delete all company record
 * 
 * @apiSuccess {String} status Succesfully deleted numberOfCompany candidates
 *
 * @apiError {String} status error
 */

/**
 * @api {get} /deleteAll-vacs/:cid Delete all vacancy record for specified company
 * @apiName deleteAllVacs
 * @apiGroup Testing
 * @apiPermission None
 * @apiParam {String} cid The id of the company
 * @apiDescription This API delete all vacancy record for specified company
 * 
 * @apiSuccess {String} status Succesfully deleted numberOfVacancy vacancies for companyName
 *
 * @apiError {String} status error
 */

/**
 * @api {get} /createAdmin Create an admin role user
 * @apiName createAdmin
 * @apiGroup Testing
 * @apiPermission None
 * @apiDescription This API create an admin role user
 * 
 * @apiSuccess {String} status Admin reset successfully.
 * @apiSuccess {String} status Created new admin user
 *
 * @apiError (500 Internal Server Error) {String} status Email already in use!
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 */