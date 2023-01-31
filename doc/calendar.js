/**
 * @api {post} /calendar/new-event Upload available timeslot
 * @apiName PostNewEvent
 * @apiGroup Calendar
 * 
 * @apiDescription This API read input from the calendar, and upload the available timeslot for candidate to book
 *
 *
 * @apiSuccess {String}   status           ok
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */

/**
 * @api {get} /calendar/get-events Read data of all calendar events
 * @apiName GetGetEvents
 * @apiGroup Calendar
 * 
 * @apiDescription This API read all calendar events from database, including booking events and available timeslots.
 *
 *
 * @apiSuccess {Object[]}   data           List of Event objects
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */