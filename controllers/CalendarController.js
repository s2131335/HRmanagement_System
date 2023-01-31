const CalendarData = require("../database/models/CalendarData");
const CandidateData = require("../database/models/CandidateData");
const { position } = require("../database/models/CompanyData");

async function newEvent (req, res){
    const dates= req.body;
    console.log(req.body);
    try{
        for (let date of dates)
        {   
            console.log("FE: "+date.start);
            var start = new Date(date.start)
            var end = new Date(date.end);
		start.setHours(start.getHours());
		end.setHours(start.getHours());
		console.log("BE: "+start);
            year = start.getFullYear();
            month = String(start.getMonth()+1).padStart(2, '0');
            day = String(start.getDate()).padStart(2, '0');
            hour = start.getHours();

            let calendar = await CalendarData.create({
                date: {"start":`${year}-${month}-${day}T${String(hour).padStart(2, '0')}:00:00`,"end":`${year}-${month}-${day}T${String(hour+1).padStart(2, '0')}:00:00`},
                year,
                month,
                day,
            })
            // console.log(calendar);
        }
    res.status(200).json({status: 'ok'})
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: 'cannot read data'});
    }
}


async function findSpecificMonth(req, res){
    const {year, month} = req.body;
    
    try{
        const specificMonth = await CalendarData.find({"year": year, "month": month});
        console.log(specificMonth);
        res.status(200).json({status: 'ok'})
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: 'cannot find data'})
    }
}

async function findSpecificDay(req, res){
    const {year, month, day} = req.body;

    try{
        const specificDay = await CalendarData.find({"year": year, "month": month, "day": day});
        console.log(specificDay);
        res.status(200).json({status: 'ok'})
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: 'cannot find data'})
    }
}

async function getEvents(req,res){
    const calendarData = require('../database/models/CalendarData');
    try{
        let events = await calendarData.find({}).populate('booked_candidate.candidate_id booked_candidate.vacancy_id');
        let data = [];
        for (let event of events)
        {
            // console.log(event);
            data.push({
                "start":event.date.start,
                "end":event.date.end,
                "name":event.booked_candidate.candidate_name,
                candidate: JSON.stringify(event.booked_candidate.candidate_id),
                vacancy: JSON.stringify(event.booked_candidate.vacancy_id)
            });
        }
        // console.log(data);
        res.status(200).json(data);
    }
    catch (err)
    {
        console.log(err);
        res.status(500).json({status: err});
    }
}

async function getRandomEvents(req,res){
    try{
        
        const can = await CandidateData.findOne({_id: req.params.id});
        const pos = await position.findOne({_id: req.params.vid});
        
        if(can == null){
            throw new Error(`Cannot find one candidate with the given id: ${req.params.id}`);
        }
        if(pos == null){
            throw new Error(`Cannot find one vacancy with the given id: ${req.params.vid}`);
        }

        const event = await CalendarData.findOne({"booked_candidate.candidate_id": req.params.id, "booked_candidate.vacancy_id": req.params.vid});

        if (event != null)
            return res.render('candidate/interview', {title: "選擇面試時間段", booked: true, event, pos});


        let dateNow = new Date();
        let years = [dateNow.getFullYear()];
        let months = [dateNow.getMonth()+1];
        if(dateNow.getDate() > 15){
            months.push((dateNow.getMonth()+1)%12 + 1);
            if(dateNow.getMonth() == 11)
                years.push(dateNow.getFullYear() + 1)
            else
                years.push(dateNow.getFullYear());
        }
        console.log(years, months, dateNow.getDate());

        var events1 = await CalendarData.find({"year": {$eq: years[0]}, "month": {$eq: months[0]}, "day": {$gt: dateNow.getDate()}, "booked_candidate.candidate_name":"接受預約"});
        var events2 = [];
        if(years.length == 2){
            events2 = await CalendarData.find({"year": years[1], "month": months[1], "day": {$lt: dateNow.getDate()}, "booked_candidate.candidate_name":"接受預約"});
        }

        const events = [...new Set([...events1, ...events2])];
        console.log(events.length);

        let random = [];
        for (let i = 0; i < 3; i++)
        {
            if(events.length){
                tmp = events[Math.floor(Math.random() * events.length)];
                events.splice(events.indexOf(tmp), 1);
                random.push(tmp);
            }
        }

        res.render('candidate/interview', {title: "選擇面試時間段", random, pos, can, booked: false});
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: err});
    }

}

async function candidateBooking(req,res){
    const {eventId} = req.body;
    try{
        console.log(eventId);
        const candidate = await CandidateData.findOne({_id: req.params.id});
        if(candidate == null){
            throw new Error(`Cannot find candidate with the given id: ${req.params.id}`);
        }
        const pos = await position.findOne({_id: req.params.vid})
        if(pos == null){
            throw new Error(`Cannot find candidate with the given id: ${req.params.vid}`);
        }
        const calendar = await CalendarData.findOneAndUpdate({_id: eventId}, {"booked_candidate.candidate_id": req.params.id, "booked_candidate.candidate_name": candidate.chinese_name, "booked_candidate.vacancy_id": req.params.vid,"is_full": true});
        // console.log('suc');
        res.status(200).json({status: 'ok'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: "err", err_msg: "時間段選擇時出現未知錯誤"});
    }

}





module.exports = {
    newEvent,
    findSpecificMonth,
    findSpecificDay,
    getEvents,
    getRandomEvents,
    candidateBooking,
};
