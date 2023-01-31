const AptestData = require("../database/models/AptestData");
const CandidateData = require("../database/models/CandidateData");
const XLSX = require("xlsx");


async function importExcel (req, res, next) {
    var workbook = XLSX.readFile(__dirname + '/../database/apt-test.xlsx');
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const exceldata = new Array();
 
    for (let cell in worksheet){
        const value = worksheet[cell].v;
        if (value){
            if (value === 'qid' || value === 'title' || value === 'set' || value === 'ans' || value === 'oidA' || value === 'textA' || 
            value === 'oidB' || value === 'textB' || value === 'oidC' || value === 'textC' || value === 'oidD' || value === 'textD')
                continue;
            else{
                exceldata.push(value);
            }
            // console.log(exceldata.length);
        }
    }
    // console.log(exceldata.length);
    for (let i = 0 ; i < 360; i += 12){
        option = [
            { 
                oid: exceldata[i+4],
                text: exceldata[i+5],
            },
            {
                oid: exceldata[i+6],
                text: exceldata[i+7], 
            },
            { 
                oid: exceldata[i+8],
                text: exceldata[i+9],
            },
            {
                oid: exceldata[i+10],
                text: exceldata[i+11], 
            }
        ]
        const apt = await AptestData.create({
            qid : exceldata[i],
            title: exceldata[i+1],
            set : exceldata[i+2],
            ans : exceldata[i+3],
            option
        })
        console.log(apt)
    }
    res.status(200).json({status: "ok"});
}

async function getQuestion(req, res, next){
    try{
        let randomset = Math.floor(Math.random()*3+1);
        const QuestionSetNumber = await AptestData.find({'set': randomset}).select(['-ans']);
        res.status(200).json({status:"ok", QuestionSetNumber});
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:"cannot find QuestionSet"});
    }
}

async function checkAnswer(req, res, next){
    try{
        const {candidateAnswer} = req.body;
        const candidateId = req.params.id;
        let last_digit = (candidateId.charAt(candidateId.length-1));
        let setNumber = last_digit.charCodeAt(0)%3;
        // select the ans from the AptestData
        // console.log(setNumber);
        let correctanswer = await AptestData.find({"set": (setNumber+1)}).select('ans');

        // counting score for the candidate
        let score = 0;
        for (let i = 0; i < 10; i++){  
            if (candidateAnswer[i] === correctanswer[i].ans){
                score ++;
            }
        }
        console.log(score);
        const candidate = await CandidateData.findOne({'_id': candidateId});
        candidate.aptest_score = score+1;
        candidate.save();

        res.status(200).json({status:"ok"});
    }
    catch (err){
        console.log(err);
        res.status(500).json({status:"no data found"});
    }
}


module.exports = {
    importExcel,
    getQuestion,
    checkAnswer
};