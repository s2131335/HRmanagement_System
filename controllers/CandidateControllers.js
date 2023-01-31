const express = require('express');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const {companydata, position} = require('../database/models/CompanyData');
const CandidateData = require('../database/models/CandidateData');
const nodeMailer = require('nodemailer');
var fs = require('fs');
var handlebars = require('handlebars');
const app = express();
const {fillPdf} = require('./FillPdf.js');

////////////////////////////////////////////////////////////////
const transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE == true,
    auth: {
        user: process.env.SENDER_EMAIL, // put email here
        pass: process.env.SENDER_PASSWORD, // put password here
    },
    });

const UserCredential = require('../database/models/UserCredential');
const AptestData = require("../database/models/AptestData");


////////////////////////////////////////////////////////////////
async function index(req, res){
    var can = await CandidateData.findOne({_id: req.session.user.database});
    console.log(req.session.user);
    return res.render('candidate/index', {title: "", cur_user: req.session.user, can})
}

async function register(req, res, next) {
    const {
        first_name,
        last_name,
        chinese_name,
        title,
        gender,
        email,
        password,
        marriage,
        spouse_name,
        spouse_hkid,  //spouse_id
        spouse_pp_loc,   // spouse_pp_loc
        district,
        address,
        mailing_address,  // mailing_address
        education,
        institution_name,
        study,
        degree,  //degree-name
        fields,  //field
        salary_range,
        salary_optional,    // salary-optional
        employment,           // job-type
        gpa,
        skill_text,
        hkid,
        related_work_experience,
    } = req.body;

    try {
        const tmp = await UserCredential.findOne({ username: email });
        if (tmp != null) { error = new Error(); error.code = 11000; throw (error); }

        const candidates = await CandidateData.create({
            first_name,
            last_name,
            chinese_name,
            title,
            gender,
            email,
            marriage,
            spouse_name,
            spouse_hkid,  //spouse_id
            spouse_loc: spouse_pp_loc,   // spouse_pp_loc
            district,
            address,
            mail_address: mailing_address,  // mailing_address
            education,
            institution_name,
            study,
            name_of_degree: degree,  //degree-name
            interested_industry: fields,  //field
            salary_range,
            expected_salary: salary_optional,    // salary-optional
            employment,           // job-type
            hkid,
            GPA: gpa,
            related_work_experience,
            skills: skill_text
        });
        const credential = await UserCredential.create(
            {
                username: email,
                password,
                role: 'CAN',
                database: candidates._id,
                model_type: "CandidateData"
            });
        console.log(candidates);
        res.json({ status: 'ok', cid: credential._id });
    } catch (error) {
        console.log(error);
        if (error.code == 11000) {
            return res.json({ status: 'error', err_msg: "電子郵件已在使用" });
        } else
            return res.status(500).json({ status: 'error', err_msg: '發生未知錯誤' });
    }
}

async function getCandidate(req, res) {
    try {
        const candidate = await CandidateData.find({});
        // const candidate_id = await CandidateData.find({'candidate_Id': candidate._id});
        res.json({ status: 'ok', candidate });
    } catch (error) {
        res.status(500).json(error);
    }
}

async function apt_test(req, res) {
    const candidateId = req.params.id;
    // console.log(candidateId);
    const can = await CandidateData.findOne({_id: candidateId});
    if (can.aptest_score != 0){
        res.redirect("/aptest/done");
    }
    let last_digit = (candidateId.charAt(candidateId.length-1));
    let QuestionSetNumber = last_digit.charCodeAt(0)%3;
    console.log(QuestionSetNumber);

    try {
        const QuestionSet = await AptestData.find({ 'set': QuestionSetNumber+1 }).select(['-ans']);
       console.log(QuestionSet);
        res.render('apttest/apt-test', { title: '候選人才能力測驗', test: QuestionSet, candidateId });
    }   
    catch (err) {
        console.log(err);
        res.status(500).json({ status: "cannot find QuestionSet" });
    }

}

async function getSpecificCandidate(req, res) {
    try {
        const onePosition = await CandidateData.find({ "_id": req.params.id });
        res.json({ status: 'ok', onePosition });
    } catch (error) {
        res.status(500).json(error);
    }
}

async function editCandidateInfo(req, res) {
    const _id = req.params.id;
    const {
        first_name,
        last_name,
        chinese_name,
        title,
        gender,
        email,
        password,
        marriage,
        spouse_name,
        spouse_hkid,  //spouse_id
        spouse_pp_loc,   // spouse_pp_loc
        district,
        address,
        mailing_address,  // mailing_address
        education,
        institution_name,
        study,
        degree,  //degree-name
        fields,  //field
        salary_range,
        salary_optional,    // salary-optional
        employment,           // job-type
        gpa,
        skill_text,
        hkid,
        related_work_experience, } = req.body;
    CandidateData.findOneAndUpdate(_id, {
        first_name,
        last_name,
        chinese_name,
        title,
        gender,
        email,
        password,
        marriage,
        spouse_name,
        spouse_hkid,  //spouse_id
        spouse_loc: spouse_pp_loc,   // spouse_pp_loc
        district,
        address,
        mail_address: mailing_address,  // mailing_address
        education,
        institution_name,
        study,
        name_of_degree: degree,  //degree-name
        interested_industry: fields,  //field
        salary_range,
        expected_salary: salary_optional,    // salary-optional
        employment,           // job-type
        hkid,
        GPA: gpa,
        related_work_experience,
        skills: skill_text
    }, (err, doc) => {
        if (!doc || err) {
            return res.json({ status: 'error', err_msg: 'Not found' });
        }
        return res.json({ status: 'ok' });
    });
}

async function IR56Eform (req, res){
    candidate_Id = req.params.id;
    console.log(req.session.user); 
    return res.render('candidate/ir56e', {title: "ir56e表格", cid: candidate_Id, vid: req.params.vid});
}

async function candidateIR56E(req, res) {
    
    const {
        start_of_employment,
        basic_salary,
        monthly_subsidy,
        residence_provided,
        residence_address,
        residence_type,
        rent_by_employer,
        rent_by_employee,
        rent_returned_to_employee,
        rent_paid_to_employer,
        paid_by_non_HK_company,
        nonHK_company_name,
        nonHK_company_address,
        stock_option,
        nonfixed_income,
        overseas
    } = req.body; 

    const IR56E = {
        start_of_employment,
        basic_salary,
        monthly_subsidy,
        residence_provided,
        residence_address,
        residence_type,
        rent_by_employer,
        rent_by_employee,
        rent_returned_to_employee,
        rent_paid_to_employer,
        nonHK_company_name,
        nonHK_company_address,
        stock_option,
        nonfixed_income,
        overseas
    };
    console.log(IR56E);
    // const candidate_id = req.params.id;
    // CandidateData.findOne({'_id': candidate_id}, ({'IR56E': IR56E}),(err, doc)=>{
    //     if (!doc || err) {
    //       return res.status(500).json({status: 'error', err_msg: 'Not found'});
    //     }
    //   });
       ////////////////
    const {destinationPDF,compName,canName,compMail,buffer} = await fillPdf(req.params.id,req.params.vid,IR56E);

/////////////////////
const html = await fs.readFileSync(__dirname + '/../email/email.html', {encoding: 'utf-8'});

let email_text = JSON.parse(fs.readFileSync(__dirname + "/../email/text.json"));
let compLogo = `http://${process.env.DOMAIN}:${process.env.PORT}/image/email-logo.png`;

let template = handlebars.compile(html,{noEscape: true});
let replacements = {
    logo: `<img src=${compLogo} width="10%" class="float-left">`,
    username :`${compName}`,
    main_content : `
        <p>已自動填寫 ${canName} 的IR56E表格, 請查看附件(請用Adobe Arcobat Reader開啓，否則部分字體將不能正常顯示) </p>
    `,
    footer: email_text.footer,
    complementary: email_text.complementary,
    sign_offs: email_text.sign_offs
};
var content = template(replacements);
// console.log(content);
const payload = {
    from: process.env.SENDER_EMAIL,
    subject: 'Filled IR56E',
    to : compMail,
    html : content,
    attachments: [{
        filename: destinationPDF.split("pdf/")[1],
        path: destinationPDF,
        contentType: 'application/pdf'
      },
      {
        filename: "supporting_doc-"+ destinationPDF.split("pdf/")[1],
        content: buffer,
        contentType: 'application/pdf'
      }
    ],
};
try {
    transporter.sendMail(payload, function (error, response) {
        if (error) {
            console.log(error);
        }else{
            console.log('Message %s sent: %s', info.messageId, info.response);
        }
    });
} catch (error) {
    console.log(`Error sending email to ${email}:`)
    console.log(error);
}

return res.status(200).json({status: 'ok'});

}


async function findCandidateIR56E(req, res) {
    const candidate_id = req.params.id;

    try {
        const candidate = await CandidateData.findOne({ '_id': candidate_id });    //find the candidate
        const IR56E = (candidate.IR56E);

       
    res.status(200).json({ status: 'ok', IR56E });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 'cannot find candidate' });
    }
}



module.exports = {
    index,
    register,
    getCandidate,
    getSpecificCandidate,
    editCandidateInfo,
    IR56Eform,
    candidateIR56E,
    findCandidateIR56E,
    apt_test
};
