/**
 * @api {post} /helper/login Login to the HR system
 * @apiName Login
 * @apiGroup Helper
 * 
 * @apiDescription This API gets username and password from the post request body and check against the login credentials stored in database.
 * 
 * @apiBody {String} username Username of the user
 * @apiBody {String} password Password of the user
 *
 *
 * @apiSuccess {String}   status           okay
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {post} /helper/register Create a new user in the HR system
 * @apiName Register
 * @apiGroup Helper
 * 
 * @apiDescription This API creates a new user in the HR system. Note that user here does not mean a candidate or a company user. 
 * 
 * @apiBody {String} username Username of the new user
 * @apiBody {String} password Password of the new user
 *
 *
 * @apiSuccess {String}   status           okay
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {get} /helper/logout Logout fron the HR system
 * @apiName Logout
 * @apiGroup Helper
 * 
 * @apiDescription This API logs out the given user by destroying their session
 *
 *
 * @apiSuccess redirect Redirect the user to the homepage
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {put} /helper/forget Forgot password
 * @apiName Forget
 * @apiGroup Helper
 * 
 * @apiDescription This API helps user to replace their password with a new one by sending an email with a link to reset their password.
 * 
 * @apiBody {String} username Username of the user
 *
 *
 * @apiSuccess {String}   status           okay
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {post} /helper/reset-password Password reset for user
 * @apiName Reset Password
 * @apiGroup Helper
 * 
 * @apiDescription This API resets the password for a given user. It validates the user by the resetlink passed.
 * 
 * @apiBody {String} resetlink Password reset link of the user
 * @apiBody {String} username Username of the user
 * @apiBody {String} newpassword New password of the user
 *
 *
 * @apiSuccess {String}   status           okay
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */