const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const smtpTransport = require('nodemailer-smtp-transport');

// const transporter = nodeMailer.createTransport(smtpTransport({
//     host: process.env.EMAIL_HOST || 'smtp.gmail.com',
//     secure: process.env.EMAIL_SECURE == true,
//     port: process.env.EMAIL_PORT || 587,
//     auth: {
//         user: process.env.SENDER_EMAIL, // put email here
//         pass: process.env.SENDER_PASSWORD, // put password here
//     }
// }));

const transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
        //user: "hrsystem.mailservice@gmail.com", // put email here
        //pass: "lmyjidxqaugoinwk", // put password here
	user: process.env.SENDER_EMAIL,
	pass: process.env.SENDER_PASSWORD,
    },
    });

const UserCredential = require('../database/models/UserCredential');
const {companydata,position} = require('../database/models/CompanyData');
const candidates = require('../database/models/CandidateData');
const CandidateData = require('../database/models/CandidateData');


var study = ["科學","工程","醫學","農業","文學","歷史","哲學","經濟學","管理","法律","教育","藝術"];

async function user_management(req, res, next) {
    if (req.session.user.role != "ADMIN") return res.status(401).json({status:"error",err_msg:"Not permitted"});
    const users = await UserCredential.find({role: {"$in": ["ADMIN", "USER"]}});
    // console.log(users);
    // res.json({users});
    // console.log(req.session);
    res.render('admin/user-management', {title: '人力資源系統', users: users, cur_user: req.session.user});
}

async function vacancy_management(req, res, next) {
    if (req.session.user.role != "ADMIN") return res.status(401).json({status:"error",err_msg:"Not permitted"});
    // console.log(req.session.user.role);
    res.render('admin/vacancy-management', {title: '人力資源系統',  role: req.session.user.role, cur_user: req.session.user});
}

async function user_calendar(req, res){
    res.render(
        'calendar/user-calendar'
        // 'calendar/candidate-slot'
        , {
      title: '面試預約月歷',
      cur_user: req.session.user
    });
  }

function new_user(req, res, next) {
    res.render('admin/new-user', {title: '新增用戶'});
}

async function account(req, res, next) {
    const user = await UserCredential.findOne({username: req.session.user.username});
    console.log(user);
    res.render('user/account', {title: '帳戶', role: user.role, username: user.username, cur_user: req.session.user});
}

async function delete_user(req, res) {
    const username = req.params;
    UserCredential.findOneAndRemove(username, (err, doc)=>{
        if (!doc || err) {
            return res.json({status: 'error', err_msg: 'Not found'});
        }
        return res.json({status: 'ok'});
    });
}

async function edit_user(req, res) {
    const data = req.body;
    UserCredential.findOneAndUpdate({username: data.username}, {username: data.username, role: data.role}, (err, doc)=>{
        if (!doc || err) {
            return res.json({status: 'error', err_msg: 'Not found'});
        }
        if(data.password) {
            doc.password = data.password;
            doc.save();
        }
        return res.json({status: 'ok'});
    });
}

//////////////////// VacancyPage ///////////////
async function getAllCandidates(req, res){
    try{
        // console.log(req.query);
 
        // const totalCount = await candidates.countDocuments();
        
        var fields = ['chinese_name', 'email', 'salary_range', 'education', 'study', 'employment'];
        var sortstring = '';
        
        for(const sort of req.query.order){
            if(sort.dir != 'asc')
            sortstring += '-';
            sortstring += fields[parseInt(sort.column)] + ' ';
        }
        
        var filter_fields = ['salary_range', 'education', 'employment'];
        var filter = {};
        // console.log(req.query.filter);
        if(req.query.filter != undefined){
            
            for(const f of filter_fields){
                if(!(req.query.filter[f] == '' || req.query.filter[f] == undefined)){
                    filter[f] = req.query.filter[f];
                }
            }
            
            if(!(req.query.filter.study == [] || req.query.filter.study == undefined)){
                filter.study = {$in: req.query.filter.study};
            }
            
        }
        
        console.log(filter);
        const pos = await position.findOne({"_id": req.params.id});
        const exclude = pos.shortlisted.concat(pos.interviewed);
        filter._id = {"$nin": exclude};
        const can = candidates.find(filter);
        const filteredCount = await candidates.find(filter).countDocuments();
        can.sort(sortstring);
        can.limit(parseInt(req.query.length));
        can.skip(parseInt(req.query.start));
        can.exec((err, cans)=>{
            if(err){
                console.log(err);
                return res.json({draw: parseInt(req.query.draw), error: err});
            }
            return res.json({draw: parseInt(req.query.draw), recordsTotal: filteredCount, recordsFiltered: filteredCount, data:cans});
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: 'error', err});
    }
}

async function getShortlisted(req, res){
    try{
        // console.log(req.query);
 
        // const totalCount = await candidates.countDocuments();
        
        var fields = ['chinese_name', 'email', 'salary_range', 'education', 'study', 'employment', 'aptest_score'];
        var sortstring = '';
        
        for(const sort of req.query.order){
            if(sort.dir != 'asc')
            sortstring += '-';
            sortstring += fields[parseInt(sort.column)] + ' ';
        }

        const pos = await position.findOne({"_id": req.params.id}); 
        const filteredCount = await candidates.find({"_id": {"$in": pos.shortlisted}}).countDocuments(); 
        const can = candidates.find({"_id": {"$in": pos.shortlisted}});
        can.sort(sortstring);
        can.limit(parseInt(req.query.length));
        can.skip(parseInt(req.query.start));

        can.exec((err, cans)=>{
            if(err){
                console.log(err);
                return res.json({draw: parseInt(req.query.draw), error: err});
            }
            return res.json({draw: parseInt(req.query.draw), recordsTotal: filteredCount, recordsFiltered: filteredCount, data:cans});
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: 'error', err});
    }
}

async function getinterview(req, res){
    try{
        
        // console.log(req.query);
 
        // const totalCount = await candidates.countDocuments();
        
        var fields = ['chinese_name', 'email', 'salary_range', 'education', 'study', 'employment'];
        var sortstring = '';
        
        for(const sort of req.query.order){
            if(sort.dir != 'asc')
            sortstring += '-';
            sortstring += fields[parseInt(sort.column)] + ' ';
        }
        
        const pos = await position.findOne({"_id": req.params.id}); 
        console.log(pos.interviewed);
        const filteredCount = await candidates.find({"_id": {"$in": pos.interviewed}}).countDocuments(); 
        const can = candidates.find({"_id": {"$in": pos.interviewed}});
        can.sort(sortstring);
        can.limit(parseInt(req.query.length));
        can.skip(parseInt(req.query.start));

        can.exec((err, cans)=>{
            if(err){
                console.log(err);
                return res.json({draw: parseInt(req.query.draw), error: err});
            }
            return res.json({draw: parseInt(req.query.draw), recordsTotal: filteredCount, recordsFiltered: filteredCount, data:cans});
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: 'error', err});
    }
}

async function getAllPositions(req, res){
    try{
        // console.log(req.query);

        var fields = ['companyName', 'positionName', 'jobNature', 'employMode', 'education', 'salary', 'major', 'experience'];
        var sortstring = '';

        for(const sort of req.query.order){
            if(sort.dir != 'asc')
                sortstring += '-';
            sortstring += fields[parseInt(sort.column)] + ' ';
        }
        
        const totalCount = await position.countDocuments();
        const filteredCount = await position.find({}).countDocuments(); 
        const pos = position.find({});
        
        pos.select(['-file']);
        pos.sort(sortstring);
        pos.limit(parseInt(req.query.length));
        pos.skip(parseInt(req.query.start));
        pos.populate('companyData');

        pos.exec((err, poss)=>{
            if(err){
                console.log(err);
                return res.json({draw: parseInt(req.query.draw), error: err});
            }
            return res.json({draw: parseInt(req.query.draw), recordsTotal: totalCount, recordsFiltered: filteredCount, data:poss});
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: 'error', err});
    }
}

async function getSpecificPosition(req,res) {
    try {
        const onePosition = await position.find({"_id": req.params.id});
        console.log(onePosition);
        // res.render('company/vacancy-info',
        //     {title: '發佈新職位空缺', fields1, fields2, study1: study.slice(0, study.length/2 + study.length %2), study2: study.slice(study.length/2 + study.length%2), onePosition}); 
        // res.json({status: 'ok', onePosition});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}



async function vacancyInfo(req, res){
    try{
        const onePosition = await position.findOne({"_id": req.params.id}).select('-file').populate('companyData');
        const position_data = {
            jobNature: onePosition.jobNature,
            employMode: onePosition.employMode,
            salary: onePosition.salary,
            education: onePosition.education,
            major: onePosition.major,
            experience: onePosition.experience
        }
        // return res.render('admin/vacancy-info', {title: "空缺匹配", cur_user: req.session.user, onePosition, position_data,});
        return res.render('admin/vacancy-info', {title: "空缺匹配", cur_user: req.session.user, onePosition, position_data, study1: study.slice(0, study.length/2 + study.length %2), study2: study.slice(study.length/2 + study.length%2)});
    }catch(err){
        console.log(err);
        res.status(500).json({status:"error"});
    }
}

async function matchVacancy(req, res){
    try{
        const onePosition = await position.findOne({"_id": req.params.id}).select('-file').populate('companyData');
        return res.render('admin/vacancy-candidates', {title: "空缺匹配", cur_user: req.session.user, onePosition, study1: study.slice(0, study.length/2 + study.length %2), study2: study.slice(study.length/2 + study.length%2)});
    }catch(err){
        console.log(err);
        res.status(500).json({status:"error"});

    }
}

async function vacancyShorlisted(req, res){
    try{
        const onePosition = await position.findOne({"_id": req.params.id}).select('-file').populate('companyData');
        return res.render('admin/vacancy-shortlisted', {title: "空缺匹配", cur_user: req.session.user, onePosition, study1: study.slice(0, study.length/2 + study.length %2), study2: study.slice(study.length/2 + study.length%2)});
    }catch(err){
        console.log(err);
        res.status(500).json({status:"error"});
    }
}

async function vacancyInterview(req, res){
    try{
        const onePosition = await position.findOne({"_id": req.params.id}).select('-file').populate('companyData');
        return res.render('admin/vacancy-interview', {title: "空缺匹配", cur_user: req.session.user, onePosition, study1: study.slice(0, study.length/2 + study.length %2), study2: study.slice(study.length/2 + study.length%2)});
    }catch(err){
        console.log(err);
        res.status(500).json({status:"error"});
    }
}

async function toCsv(req, res) {
    const {parse} = require('json2csv');
    try {
        var filter = {};
        var filter_fields = ['salary_range', 'education', 'employment'];
        // console.log(req.body.filter);
        if(req.body.filter != undefined){
            
            for(const f of filter_fields){
                if(!(req.body.filter[f] == '' || req.body.filter[f] == undefined)){
                    filter[f] = req.body.filter[f];
                }
            }
            // console.log(req.body.filter.study.length);
            if(!(req.body.filter.study == 0)){
                filter.study = {$in: req.body.filter.study};
            }
            
        }
        const can = await candidates.find(filter);
        // console.log(filter);
        // console.log(data);
        can.map(d=>{
            if(d.education == "0"){
                d.education = "中學畢業";
            }else if(d.education == "1"){
                d.education = "大學畢業";
            }else if(d.education == "2"){
                d.education = "碩士畢業";
            }else{
                d.education = "博士或更高學歷";
            }
            if(d.employment == "0"){
                d.employment = "全職";
            }else{
                d.employment = "兼職";
            }
        })
        const fields = ['chinese_name','salary_range','education','study','GPA','employment'];
        const data = parse(can,{fields,excelStrings: true,withBOM: true});
        // console.log(data);
        res.setHeader('Content-Type', 'application/csv');
        res.setHeader('Content-Disposition', 'inline; filename="x.csv"');
        res.status(200).send(data);
    } catch (error) 
    {
        console.log(error);
        res.status(500).json(error);
    }
}

async function sendTests(req, res){
    var filter = {};
        var filter_fields = ['salary_range', 'education', 'employment'];
        // console.log(req.body.filter);
        if(req.body.filter != undefined){
            
            for(const f of filter_fields){
                if(!(req.body.filter[f] == '' || req.body.filter[f] == undefined)){
                    filter[f] = req.body.filter[f];
                }
            }
            // console.log(req.body.filter.study.length);
            if(!(req.body.filter.study == 0)){
                filter.study = {$in: req.body.filter.study};
            }
            
        }

        const pos = await position.findOne({"_id": req.params.id});
        const exclude = pos.shortlisted.concat(pos.interviewed);
        filter._id = {"$nin": exclude};
        const cans = await candidates.find(filter)

        /// Email
        const html = await fs.readFileSync(__dirname + '/../email/email.html', {encoding: 'utf-8'});
        let template = handlebars.compile(html,{noEscape: true});

        let email_text = JSON.parse(fs.readFileSync(__dirname + "/../email/text.json"));
        let compLogo = `http://${process.env.DOMAIN}:${process.env.PORT}/image/email-logo.png`;
        
        let replacements = {
            logo: `<img src=${compLogo} width="10%" class="float-left">`,
            footer: `${email_text.footer}`,
            complementary: email_text.complementary,
            sign_offs: email_text.sign_offs
        };
        const data = {
            from: process.env.SENDER_EMAIL,
            subject: 'Apittude Test Invitation',
        };
        
        var sent = 0;
        for (let can of cans) 
        {  
            replacements.main_content = `
                <p>請完成所選職位(${pos.positionName})的
                <a href="http://${process.env.DOMAIN}:${process.env.PORT}/candidate/apt-test/${can._id}" target="_blank">能力測試</a>
                </p>
            `;
            replacements.username = can.chinese_name;
            let content = template(replacements);
            data.to = can.email;
            data.html = content;
            try {
                transporter.sendMail(data, function (error, response) {
                    if (error) {
                        console.log(error);
                    }else{
                        sent += 1;
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    }
                });

            } catch (error) {
                console.log(`Error sending email to ${can.email}:`)
                console.log(error);
                res.status(500).json(error);

            }
        }
        await new Promise(resolve => setTimeout(resolve, 7500));
        pos.shortlisted = (pos.shortlisted).concat(cans.map(a => a._id));
        console.log(pos.shortlisted);
        await pos.save();
        return res.json({status: 'ok', message: `至今已發送 ${sent}/${cans.length} 能力測試!`});
    }


async function sendInterview(req, res){
    try{
        const pid = req.params.id;
        const pos = await position.findOne({"_id": pid});
        const canId = req.params.cid;
        const can = await candidates.findOne({"_id": canId});
        const email = can.email;
            // console.log(canMail);
            // console.log(canId);
        /// Email
        const html = await fs.readFileSync(__dirname + '/../email/email.html', {encoding: 'utf-8'});

        let email_text = JSON.parse(fs.readFileSync(__dirname + "/../email/text.json"));
        let compLogo = `http://${process.env.DOMAIN}:${process.env.PORT}/image/email-logo.png`;

        let template = handlebars.compile(html,{noEscape: true});
        let replacements = {
            logo: `<img src=${compLogo} width="10%" class="float-left">`,
            username :`${can.chinese_name}`,
            main_content : `
                <p>恭喜。</p>
                <p>您已被選中接受以下職位的面試：</p>
                <p><strong>${pos.positionName}</strong></p>
                <p>請選擇您的可用
                <a href="http://${process.env.DOMAIN}:${process.env.PORT}/candidate/${canId}/interview/${pid}" target="_blank">時間段 </a></p>
            `,
            footer: email_text.footer,
            complementary: email_text.complementary,
            sign_offs: email_text.sign_offs
        };
        var content = template(replacements);
        console.log(content);
        const data = {
            from: process.env.SENDER_EMAIL,
            subject: 'Interview Invitation',
        };
        data.to = email;
        data.html = content;
        try {
            transporter.sendMail(data, function (error, response) {
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
        try {
            
            pos.interviewed.push(canId);
            pos.shortlisted.splice(pos.shortlisted.indexOf(canId),1);
            console.log(pos.shortlisted);
            await pos.save();
            await new Promise(resolve => setTimeout(resolve, 1000));
            return res.json({status: 'ok', message: '已發送面試邀請!'})
        }
        catch (err)
        {
            return res.json({status: 'error', message: err});
        }
    }catch(err){
        console.log(err);
        return res.json({status: 'error', message: err});
    }
}

async function removeFromShortlisted(req, res){
    const pid = req.params.id;
    const canId = req.params.cid;

    try{
        const pos = await position.findOne({"_id": pid});
        pos.shortlisted.splice(pos.shortlisted.indexOf(canId),1);
        console.log(pos.shortlisted);
        await pos.save();
        return res.json({status: 'ok', message: 'Deleted!'})
    }
    catch (err)
    {
        return res.json({status: 'error', message: err});
    }
}

async function removeFromInterviewed(req, res){
    const pid = req.params.id;
    const canId = req.params.cid;

    try{
        const pos = await position.findOne({"_id": pid});
        pos.interviewed.splice(pos.interviewed.indexOf(canId),1);
        console.log(pos.interviewed);
        await pos.save();
        return res.json({status: 'ok', message: 'Deleted!'})
    }
    catch (err)
    {
        return res.json({status: 'error', message: err});
    }
}

async function sendIr56e(req, res){
// let rawdata = fs.readFileSync(__dirname + "/../email/text.json");
// let email_text = JSON.parse(rawdata);

    const pid = req.params.id;
    const canId = req.params.cid;
    const pos = await position.findOne({"_id": pid}).populate('companyData');
    console.log(pos.companyData.email);
    console.log(canId);
    /// Email
    const html = await fs.readFileSync(__dirname + '/../email/email.html', {encoding: 'utf-8'});
    let email_text = JSON.parse(fs.readFileSync(__dirname + "/../email/text.json"));
    let compLogo = `http://${process.env.DOMAIN}:${process.env.PORT}/image/email-logo.png`;

    let template = handlebars.compile(html,{noEscape: true});
    let replacements = {
        logo: `<img src=${compLogo} width="10%" class="float-left">`,
        main_content : `
        <p>請填寫ir56e表格:</p>
        <p>http://${process.env.DOMAIN}:${process.env.PORT}/candidate/ir56eform/${canId}/${pid}</p>
        `,
        footer: email_text.footer,
        complementary: email_text.complementary,
        sign_offs: email_text.sign_offs
    };
    var content = template(replacements);
    console.log(content);
    const data = {
        from: process.env.SENDER_EMAIL,
        subject: 'IR56E Form',
    };
    data.to = pos.companyData.email;
    data.html = content;
    try {
        transporter.sendMail(data, function (error, response) {
            if (error) {
                console.log(error);
            }else{
                sent += 1;
                console.log('Message %s sent: %s', info.messageId, info.response);
            }
        });
    } catch (error) {
        console.log(`Error sending email to ${pos.companyData.email}:`)
        console.log(error);
    }
    pos.interviewed.splice(pos.interviewed.indexOf(canId),1);
    // console.log(pos.interviewed);
    await pos.save();
    await new Promise(resolve => setTimeout(resolve, 1000));
    return res.json({status: 'ok', message: '已發送 IR56E!'})
}



function email_template(req, res){
    let email_text = JSON.parse(fs.readFileSync(__dirname + "/../email/text.json"));
    return res.render('admin/email-template', {email_text});
}

function update_email_template(req, res){
    const {header, complementary, sign_offs, footer} = req.body;
    try{
        fs.writeFileSync(__dirname + "/../email/text.json", JSON.stringify({header, complementary, sign_offs, footer}));
        res.json({status: "ok"});
    }catch(err){
        console.log(err);
        res.json({status: "error", err_msg: "修改電郵模板時出錯"});
    }
}

function update_email_logo(req, res){
    try{
        fs.writeFileSync(__dirname + '/../public/image/email-logo.png', req.file.buffer);
        res.json({status: "ok"});
    }catch(err){
        console.log(err);
        res.json({status: "error"});
    }
}

function candidate_management(req, res){
    return res.render('admin/candidate-management', {title: "候選人才管理", cur_user: req.session.user});
}

async function getAllCan(req, res){
    try{
        var fields = ['chinese_name', 'email', 'salary_range', 'education', 'study', 'employment'];
        var sortstring = '';
        
        for(const sort of req.query.order){
            if(sort.dir != 'asc')
            sortstring += '-';
            sortstring += fields[parseInt(sort.column)] + ' ';
        }
        
        var filter_fields = ['salary_range', 'education', 'employment'];
        var filter = {};
        // console.log(req.query.filter);
        if(req.query.filter != undefined){
            
            for(const f of filter_fields){
                if(!(req.query.filter[f] == '' || req.query.filter[f] == undefined)){
                    filter[f] = req.query.filter[f];
                }
            }
            
            if(!(req.query.filter.study == [] || req.query.filter.study == undefined)){
                filter.study = {$in: req.query.filter.study};
            }
            
        }
        
        const can = candidates.find(filter);
        const filteredCount = await candidates.find(filter).countDocuments();
        can.sort(sortstring);
        can.limit(parseInt(req.query.length));
        can.skip(parseInt(req.query.start));
        can.exec((err, cans)=>{
            if(err){
                console.log(err);
                return res.json({draw: parseInt(req.query.draw), error: err});
            }
            return res.json({draw: parseInt(req.query.draw), recordsTotal: filteredCount, recordsFiltered: filteredCount, data:cans});
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: 'error', err});
    }
}


async function deleteCandidate(req, res){
    CandidateData.findOneAndRemove({_id: req.params.id}, (err, doc)=>{
        if (!doc || err) {
            console.log(err);
            return res.json({status: "err", err_msg: "候選人刪除期間發生未知錯誤!"});
        }
        UserCredential.findOneAndRemove({database: req.params.id, role: "CAN"}, (err, doc)=>{
            if (!doc || err) {
                console.log(err);
                return res.json({status: "err", err_msg: "候選人刪除期間發生未知錯誤!"});
            }
            return res.json({status: 'ok'});
        });
    });

}

module.exports = {
    user_management,
    vacancy_management,
    user_calendar,
    new_user,
    delete_user,
    edit_user,
    account,
    getAllPositions,
    getSpecificPosition,
    matchVacancy,
    getAllCandidates,
    getShortlisted,
    getinterview,
    toCsv,
    sendTests,
    vacancyInfo,
    vacancyInterview,
    vacancyShorlisted,
    sendInterview,
    removeFromShortlisted,
    removeFromInterviewed,
    sendIr56e,
    email_template,
    update_email_template,
    update_email_logo,
    candidate_management,
    getAllCan,
    deleteCandidate
};
