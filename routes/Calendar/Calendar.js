const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { newEvent, findSpecificMonth, findSpecificDay,getEvents } = require("../../controllers/CalendarController");
const authentication = require('../../middlewares/authentication');



router.post('/new-event',authentication, newEvent);

router.get('/get-events',authentication,getEvents);
// router.get('/findSpecificMonth',authentication, findSpecificMonth);
// router.get('/findSpecificDay',authentication,findSpecificDay);


module.exports = router;