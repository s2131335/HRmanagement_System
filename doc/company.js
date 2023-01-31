/**
 * @api {post} /register Create a new company
 * @apiName register
 * @apiGroup Company
 * @apiPermission None
 * @apiDescription This API create a new company record
 * 
 * @apiSuccess {String} status ok
 *
 * @apiError {String} status 電子郵件已被使用!
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 * 
 */

/**
 * @api {get} /new-position  Create a vacancy record
 * @apiName newVacancy
 * @apiGroup Company
 * @apiPermission COM
 * @apiDescription This API create a vacancy record
 * 
 * @apiSuccess {String} status ok
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 * 
 */

/**
 * @api {get} /get-position  Get all position record for the company
 * @apiName getPositions
 * @apiGroup Company
 * @apiPermission COM
 * @apiDescription This API get all position record for the company
 * 
 * @apiSuccess {String} status ok
 * @apiSuccess {Json} doc
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 * 
 */

/**
 * @api {get} /get-specific-position/:id  Get a specific position record 
 * @apiName getSpecificPosition
 * @apiGroup Company
 * @apiPermission COM
 * @apiDescription This API get a specific position record
 * 
 * @apiParam {String} id The id of the position
 * 
 * @apiSuccess {Path} company/vacancy-info
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 * 
 */

/**
 * @api {delete} /delete-position/:id  Delete a specific position record 
 * @apiName deletePosition
 * @apiGroup Company
 * @apiPermission COM
 * @apiDescription This API delete a specific position record 
 * 
 * @apiParam {String} id The id of the position
 * 
 * @apiSuccess {String} status ok
 * @apiError {String} status Not found
 * @apiError {String} status eroor
 * 
 */

/**
 * @api {post} /edit-position/:id  Edit info of a specific position record 
 * @apiName editPosition
 * @apiGroup Company
 * @apiPermission COM
 * @apiDescription This API delete a specific position record 
 * 
 * @apiParam {String} id The id of the position
 * @apibody {String} positionName Name of the position
 * @apibody {String} jobNature Nature of the job
 * @apibody {String} employMode Mode of employment
 * @apibody {String} salary Salary
 * @apibody {String} skill_text Skill required
 * @apibody {String} education Education level
 * @apibody {String} text Text
 * @apibody {String} experience Year of experience 
 * @apibody {String} cert Cert of education
 * @apibody {String} employment_type Type of employment
 * @apibody {String} opt_year Year of opportunity 
 * @apibody {String} major Major of the education
 * @apibody {String} opportunity Opportunity of the job
 * 
 * @apiSuccess {String} status ok
 * @apiError {String} status Not found
 * 
 */

/**
 * @api {get} /edit  Go to the company edit page
 * @apiName editComp
 * @apiGroup Company
 * @apiPermission COM
 * @apiDescription This Go to the company edit page
 * 
 * 
 * @apiSuccess {Path} company/edit
 * @apiError {String} status eroor
 * 
 */

/**
 * @api {post} /edit  Edit the info of company
 * @apiName editCompInfo
 * @apiGroup Company
 * @apiPermission COM
 * @apiDescription This Edit the info of company
 * 
 * @apibody {String} contactName Name of the contact person
 * @apibody {String} companyName Name of the company
 * @apibody {String} phone Phone number of the contact
 * @apibody {String} registerNumber Number of commercial registration
 * @apibody {String} HKID HKID number of the contact
 * @apibody {String} address Address of the company
 * @apibody {String} industry Industry of that company belongs to
 * @apibody {String} district District of the company
 * 
 * @apiSuccess {String} status ok
 * @apiError {String} status 信息編輯時出現未知錯誤!
 * 
 */

/**
 * @api {get} /new-position  Go to the add vacancy page
 * @apiName newVacancy
 * @apiGroup Company
 * @apiPermission COM
 * @apiDescription This go to the add vacancy page
 * 
 * @apiSuccess {Path} company/vacancy
 * 
 */