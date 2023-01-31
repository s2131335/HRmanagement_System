/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const UserCredential = require('../database/models/UserCredential');
const {companydata, position} = require('../database/models/CompanyData');

const fs = require('fs');
let fields; let fields1; let fields2;
fs.readFile(__dirname + '/../public/JobNature_List_Chinese.csv', 'utf8', function(err, data) {
    if (!err) {
        fields = data.split(/\r?\n/);
        fields1 = fields.slice(0, fields.length/2 + fields.length % 2);
        fields2 = fields.slice(fields.length/2 + fields.length % 2);
    } else {
        console.error(err);
    }
});

let businessNature;
fs.readFile(__dirname + '/../public/BizNature.csv', 'utf8', function (err, data) {
    if (!err) {
        businessNature = data.split(/\r?\n/);
    } else {
        console.error(err);
    }
});
const districts = ['中西區', '東區', '南區', '灣仔區',
  '九龍城區', '觀塘區', '深水埗區', '黃大仙區', '油尖旺區',
  '離島區', '葵青區', '北區', '西貢區', '沙田區', '大埔區', '荃灣區', '屯門區', '元朗區'];

const study = ['科學', '工程', '醫學', '農業', '文學', '歷史', '哲學', '經濟學', '管理', '法律', '教育', '藝術'];

async function index(req, res){
    const positions = await position.find({companyData: req.session.user.database});

    // console.log("UserID: " + req.session.user._id);
    // console.log("Positions: " +positions);
    res.render('company/vacancy-management', {title: '職位空缺管理', positions, cur_user: req.session.user});
}

function newVacancy(req, res){
    res.render('company/vacancy', {title: '發佈新職位空缺', cur_user: req.session.user, fields1, fields2, study1: study.slice(0, study.length/2 + study.length %2), study2: study.slice(study.length/2 + study.length%2)});
}

async function register(req, res) {
    const {email, password, contactName, companyName, phone, registerNumber, HKID, address, industry, district} = req.body;
    try {
        const tmp = await UserCredential.findOne({username: email});
        if (tmp !=null) {
            error = new Error(); error.code=11000; throw (error);
        }

        const company = await companydata.create(
        {
            email,
            password,
            contactName,
            companyName,
            phone,
            registerNumber,
            HKID,
            address,
            industry,
            district,
        });

        const credential = await UserCredential.create({username: email, password, role:'COM', database: company._id, model_type: "CompanyData"});

    // credential.database = company._id;
    // credential.database.model_type = "CompanyData";
    // await credential.save();
    res.json({'status': 'ok'});
    // const token = await credential.generateAuthToken();
  } catch (error) {
    // await UserCredential.deleteOne({username : email});
    console.log(error);
    if (error.code===11000) {
      return res.status(500).json({status: 'error', err_msg: '電子郵件已被使用!'});
    }
    //    if (error.errors.password.message==='To short') {
    //     return res.status(500).json({status: 'error', err_msg: 'Password must be longer than 8 characters!'});
    // }

        res.status(500).json(error);
    }
}

async function newPosition(req, res){
    const {
        positionName, 
        jobNature, 
        employMode, 
        salary, 
        skill_text, 
        education, 
        text, 
        experience, 
        cert, 
        employment_type, 
        opt_year, 
        major, 
        opportunity} = req.body;
    try {
        const company = await companydata.findOne({'email': req.session.user.username});
        // console.log(req.session.user.username);
        // console.log(company);
        const positionData = await position.create({positionName, 
            jobNature, 
            employMode, 
            salary, 
            skill_text, 
            education, 
            text, 
            experience,
            cert, 
            employment_type, 
            opt_year, 
            major, 
            opportunity,
            companyData: company._id});
        company.positions.set(positionData._id,positionName);
        await company.save();
        // const token = await credential.generateAuthToken();
        res.json({status: 'ok'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

async function getPositions(req,res) {
    try {
        const company = await companydata.findOne({'email': req.session.email});
        // console.log(req.session.user);
        // console.log(company);
        const positions = await position.find({'companyData': company._id});
        // console.log(positions);
        positions.populate('companyData').exec((err,doc)=>{
            if(!err){
                // console.log(positions);
                return res.json({status: 'ok', doc});
            }
            else throw new Error(err);
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

async function getSpecificPosition(req,res) {
    try {
        const onePosition = await position.find({"_id": req.params.id});
        console.log(onePosition);
        res.render('company/vacancy-info',
            {title: '發佈新職位空缺', cur_user: req.session.user, fields1, fields2, study1: study.slice(0, study.length/2 + study.length %2), study2: study.slice(study.length/2 + study.length%2), onePosition}); 
        // res.json({status: 'ok', onePosition});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

async function deletePosition(req, res) {
    const _id = req.params.id;
    try {
        const company = await companydata.findOne({'email': req.session.user.username});
        // console.log(company);
        company.positions.delete(_id);
        await company.save();
    } catch (error) {
        res.json({status: 'error', error});
    }
    position.deleteOne({_id: _id}, (err, doc)=>{
      if (!doc || err) {
          return res.json({status: 'error', err_msg: 'Not found'});
      } else {
          console.log(err);
      }
      return res.json({status: 'ok'});
    });
}

async function editPosition(req, res) {
    const _id = req.params.id;
    const {
        positionName,
        jobNature,
        employMode,
        salary,
        skill_text,
        education,
        text,
        experience,
        cert,
        employment_type,
        opt_year,
        major,
        opportunity,
    } = req.body;
    let doc = await position.findOneAndUpdate({_id}, {
        positionName,
        jobNature,
        employMode,
        salary,
        skill_text,
        education,
        text,
        experience,
        cert,
        employment_type,
        opt_year,
        major,
        opportunity,
    });
	await doc.save();
	console.log(doc);
	return res.json({status: 'ok'});
}

async function editComp(req, res){
    try{
        const comp = await companydata.findOne({_id: req.session.user.database});
        return res.render("company/edit", {title: "編輯資料", comp, cur_user: req.session.user, districts, businessNature});
    }catch(err){
        console.log(err);
    }
}

async function editCompInfo(req, res){
    const {contactName, companyName, phone, registerNumber, HKID, address, industry, district} = req.body;
    console.log(req.body);
    try{
        const comp = await companydata.findOneAndUpdate({_id: req.session.user.database}, {contactName,companyName,phone,registerNumber,HKID,address,industry,district});
        console.log("edit success");
	return res.json({status: "ok"});
    }catch(err){
        console.log(err);
        return res.json({status: "error", err_msg: "信息編輯時出現未知錯誤!"})
    }
}


module.exports = {
    index,
    register,
    newPosition,
    getPositions,
    getSpecificPosition,
    deletePosition,
    editPosition,
    newVacancy,
    editComp,
    editCompInfo
};
