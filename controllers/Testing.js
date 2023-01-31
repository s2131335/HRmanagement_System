const UserCredential = require('../database/models/UserCredential');
const {companydata,position} = require('../database/models/CompanyData');
const candidates = require('../database/models/CandidateData');
const path = require('path');
const fs = require('fs');
const CandidateData = require('../database/models/CandidateData');

const MAX_CAN = 100;
const MAX_VAC = 20;
const MAX_COMP = 50;

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

var alphabets = 'abcdefghijklmnopqrstuvwxyz';

var chinese_first = "趙錢孫李周吳鄭王馮陳褚衛蔣沈韓楊朱秦尤許何呂施張孔曹嚴華金魏陶姜戚謝鄒喻柏水竇章雲蘇潘葛奚范彭郎魯韋昌馬苗鳳花方俞任袁柳酆鮑史唐費廉岑薛雷賀倪湯滕殷羅畢郝鄔安常樂于時傅皮卞齊康伍余元卜顧孟平黃和穆蕭尹姚邵湛汪祁毛禹狄米貝明臧計伏成戴談宋茅龐熊紀舒屈項祝董梁杜阮藍閔席季麻強賈路婁危江童顏郭梅盛林刁鍾徐邱駱高夏蔡田樊胡凌霍虞萬支柯昝管盧莫經房裘繆干解應宗丁宣賁鄧郁單杭洪包諸左石崔吉鈕龔程嵇邢滑裴陸榮翁荀羊於惠甄麴家封芮羿儲靳汲邴糜松井段富巫烏焦巴弓牧隗山谷車侯宓蓬全郗班仰秋仲伊宮甯仇欒暴甘鈄厲戎祖武符劉景詹束龍葉幸司韶郜黎薊薄印宿白懷蒲邰從鄂索咸籍賴卓藺屠蒙池喬陰鬱胥能蒼雙聞莘黨翟譚貢勞逄姬申扶堵冉宰酈雍郤璩桑桂濮牛壽通邊扈燕冀郟浦尚農溫別莊晏柴瞿閻充慕連茹習宦艾魚容向古易慎戈廖庾終暨居衡步都耿滿弘匡國文寇廣祿闕東歐殳沃利蔚越夔隆師鞏厙聶晁勾敖融冷訾辛闞那簡饒空曾毋沙乜養鞠須豐巢關蒯相查後荊紅游竺權逯蓋益桓公";

var english_first = "Zhao Qian Sun Li Zhou Wu Zheng Wang Feng Chen Chu Wei Jiang Shen Han Yang Zhu Qin You Xu He Lu Shi Zhang Kong Cao Yan Hua Jin Wei Tao Jiang Qi Xie Zou Yu Bai Shui Dou Zhang Yun Su Pan Ge Xi Fan Peng Lang Lu Wei Chang Ma Miao Feng Hua Fang Yu Ren Yuan Liu Feng Bao Shi Tang Fei Lian Cen Xue Lei He Ni Tang Teng Yin Luo Bi Hao Wu An Chang Le Yu Shi Fu Pi Bian Qi Kang Wu Yu Yuan Bu Gu Meng Ping Huang He Mu Xiao Yin Yao Shao Zhan Wang Qi Mao Yu Di Mi Bei Ming Zang Ji Fu Cheng Dai Tan Song Mao Pang Xiong Ji Shu Qu Xiang Zhu Dong Liang Du Ruan Lan Min Xi Ji Ma Qiang Jia Lu Lou Wei Jiang Tong Yan Guo Mei Sheng Lin Diao Zhong Xu Qiu Luo Gao Xia Cai Tian Fan Hu Ling Huo Yu Wan Zhi Ke Zan Guan Lu Mo Jing Fang Qiu Miao Qian Xie Ying Zong Ding Xuan Ben Deng Yu Shan Hang Hong Bao Zhu Zuo Shi Cui Ji Niu Gong Cheng Ji Xing Hua Pei Lu Rong Weng Xun Yang Yu Hui Zhen Qu Jia Feng Rui Yi Chu Jin Ji Bing Mi Song Jing Duan Fu Wu Wu Jiao Ba Gong Mu Kui Shan Gu Che Hou Mi Peng Quan Xi Ban Yang Qiu Zhong Yi Gong Ning Qiu Luan Bao Gan Qi Li Rong Zu Wu Fu Liu Jing Zhan Shu Long Ye Xing Si Shao Gao Li Ji Bo Yin Su Bai Huai Pu Tai Cong E Suo Xian Ji Lai Zhuo Lin Tu Meng Chi Qiao Yin Yue Xu Neng Cang Shuang Wen Xin Dang Zhai Tan Gong Lao Pang Ji Shen Fu Du Ran Zai Li Yong Que Qu Sang Gui Pu Niu Shou Tong Bian Hu Yan Ji Jia Pu Shang Nong Wen Bie Zhuang Yan Chai Qu Yan Chong Mu Lian Ru Xi Huan Ai Yu Rong Xiang Gu Yi Shen Ge Liao Yu Zhong and Ju Heng Bu Du Geng Man Hong Kuang Guo Wen Kou Guang Lu Que Dong Au Shu Wo Li Wei Yue Kui Long Shi Gong She Nie Chao Gou Ao Rong Leng Zi Xin Kan Na Jian Rao Kong Zeng Wu Sha Nie Yang Ju Xu Feng Chao Guan Kuai Xiang Zha Hou Jing Hong You Zhu Quan Lu Gai Yi Huan Gong"

english_first = english_first.split(' ');

var title = ["Mr.", "Ms.", "Mrs."];
var gender = ["M", "F", "F"];
var marriage = ["0", '1'];
var education = ["0", "1", "2", "3"];
var institution_name = ["CUHK", "HKU", "UST", "CityU", "PolyU", "LingU", "OpenU", "EduU"];
var study = ["科學","工程","醫學","農業","文學","歷史","哲學","經濟學","管理","法律","教育","藝術"];
var fields;
fs.readFile(__dirname + '/../public/JobNature_List_Chinese.csv', 'utf8', function (err, data) {
    if(!err){
        fields = data.split(/\r?\n/);
    }else{
        console.error(err);
    }
});
var salary = ["<9999"];
for(let i = 10000; i < 100000; i+=5000){
    salary.push(i+' - ' + (i+4999));
}
var employment = ["0", "1"];

var skills = ["excel", 'word', 'python', 'r', 'calculus', 'data mining', 'data science', 'os', 'linux', 'c#', 'c', 'js', 'powerpoint'];

var opportunity = ['None', 'Acquire new skills hastely', 'Promoted in 3 years if found apt', 'Harsh but rewarding working environment'];

async function generateCans(req, res){
    try{
        for(let i = 0; i < Math.min(MAX_CAN, parseInt(req.params.no)); i++){
            var frn = Math.floor(Math.random() * english_first.length);
            var lrn1 = Math.floor(Math.random() * english_first.length);
            var lrn2 = Math.floor(Math.random() * english_first.length);
            
            var cfirst_name = english_first[frn], clast_name = english_first[lrn1] + ' ' + english_first[lrn2];
            var cpassword = process.env.RAND_CAN_PW || "asdfasdf";
            var cchinese_name = chinese_first[frn] + chinese_first[lrn1] + chinese_first[lrn2];
            var trn = Math.floor(Math.random() * 3);
            var ctitle = title[trn];
            var cgender = gender[trn];
            var cemail = '';
            for(let i = 0; i < 10; i++){
                cemail += alphabets[Math.floor(Math.random() * 26)];
            }
            cemail += '@';
            for(let i = 0; i < 5; i++){
                cemail += alphabets[Math.floor(Math.random() * 26)];
            }
            cemail+='.com';
            var cmarriage = Math.floor(Math.random() * 2);
            var cdistrict = Math.floor(Math.random() * 18);
            var caddress = 'address of ' + cfirst_name + ' ' + clast_name;
            var ceducation = education[Math.floor(Math.random() * 4)];
            var cinstitution_name = institution_name[Math.floor(Math.random() * 8)];
            var cstudy = study[Math.floor(Math.random() * study.length)];
            var cname_of_degree = 'Bsc. ' + cstudy;
            var iirn = Math.floor(Math.random() * 5) + 1;
            var cinterested_industry = [];
            for(let j = 0; j < iirn; j++){
                cinterested_industry.push(fields[Math.floor(Math.random() * fields.length)]);
            }
            var csalary_range = salary[Math.floor(Math.random() * salary.length)];
            var cexpected_salary;
            if(csalary_range == '<9999')
                cexpected_salary = Math.floor(Math.random() * 10000);
            else
                cexpected_salary = parseInt(csalary_range.split('-')[0]) + Math.floor(Math.random() * 5000);
            var cemployment = employment[Math.floor(Math.random() * 2)];
            var chkid = alphabets[Math.floor(Math.random() * 26)];
            chkid = chkid.toUpperCase();
            for(let j = 0; j < 7; j++){
                chkid += Math.floor(Math.random() * 10);
            }
            var cgpa = Math.round(Math.random() * 400) / 100;
            var cskills = skills[Math.floor(Math.random() * skills.length)];

            const candidate = await CandidateData.create({
                first_name: cfirst_name, 
                last_name: clast_name, 
                chinese_name: cchinese_name, 
                title: ctitle,
                gender: cgender, 
                email: cemail, 
                marriage: cmarriage, 
                district: cdistrict, 
                address: caddress, 
                education: ceducation,
                institution_name: cinstitution_name, 
                study: cstudy, 
                name_of_degree: cname_of_degree,  //degree-name
                interested_industry: cinterested_industry,  //field
                salary_range: csalary_range,
                expected_salary: cexpected_salary,    // salary-optional
                employment: cemployment,           // employment
                hkid: chkid, 
                GPA: cgpa, 
                skills: cskills
            });
            const credential = await UserCredential.create(
                {
                    username : cemail, 
                    password: cpassword, 
                    role: 'CAN',
                    database : candidate._id,
                    model_type: "CandidateData"
                });
        }
    }catch(err){
        console.log(err);
        return res.json({status: "error"})
    }
    res.json({status: "Succesfully created "+req.params.no + " random candidates!"});
}


async function generateComps(req, res){
    try{
        for(let i = 0; i < Math.min(MAX_COMP, parseInt(req.params.no)); i++){
            var frn = Math.floor(Math.random() * english_first.length);
            var lrn1 = Math.floor(Math.random() * english_first.length);
            var lrn2 = Math.floor(Math.random() * english_first.length);

            var cchinese_name = chinese_first[frn] + chinese_first[lrn1] + chinese_first[lrn2];
            var cemail = '';
            for(let i = 0; i < 10; i++){
                cemail += alphabets[Math.floor(Math.random() * 26)];
            }
            cemail += '@';
            for(let i = 0; i < 5; i++){
                cemail += alphabets[Math.floor(Math.random() * 26)];
            }
            var cpassword = process.env.RAND_COMP_PW || "12341234";
            cemail+='.com';
            var cdistrict = Math.floor(Math.random() * 18);
            var iirn = Math.floor(Math.random() * 5) + 1;
            var cindusty = [];
            for(let j = 0; j < iirn; j++){
                cindusty.push(fields[Math.floor(Math.random() * fields.length)]);
            }
            var chkid = alphabets[Math.floor(Math.random() * 26)];
            chkid = chkid.toUpperCase();
            for(let j = 0; j < 7; j++){
                chkid += Math.floor(Math.random() * 10);
            }
            var cphone = '';
            for(let j = 0; j < 8; j++){
                cphone += Math.floor(Math.random() * 10);
            }
            var cregisterNumber = '';
            for(let j = 0; j < 8; j++){
                cregisterNumber += Math.floor(Math.random() * 10);
            }
            cregisterNumber += '-';
            for(let j = 0; j < 3; j++){
                cregisterNumber += Math.floor(Math.random() * 10);
            }
            cregisterNumber += '-';
            for(let j = 0; j < 2; j++){
                cregisterNumber += Math.floor(Math.random() * 10);
            }
            cregisterNumber += '-';
            for(let j = 0; j < 2; j++){
                cregisterNumber += Math.floor(Math.random() * 10);
            }
            cregisterNumber += '-' + Math.floor(Math.random() * 10);

            var ccompany_name = '';
            var crn = Math.floor(Math.random() * 10) + 1;
            for(let j = 0; j < crn; j++){
                ccompany_name += alphabets[Math.floor(Math.random() * 26)];
            }
            ccompany_name.toUpperCase();
            ccompany_name += ' Ltd.';
            var caddress = 'address of ' + ccompany_name;


            const company = await companydata.create({
                email: cemail, 
                contactName: cchinese_name, 
                companyName: ccompany_name,
                phone: cphone,
                registerNumber: cregisterNumber,
                HKID: chkid,
                address: caddress, 
                industry: cindusty, 
                district: cdistrict
            });

            const credential = await UserCredential.create(
                {
                    username : cemail, 
                    password: cpassword, 
                    role: 'COM',
                    database : candidates._id,
                    model_type: "CompanyData"
                });
        }
    }catch(err){
        console.log(err);
        return res.json({status: "error"})
    }
    res.json({status: "Succesfully created "+req.params.no + " random companies!"});
}

async function generateVacancies(req, res){
    try{
        const comp = await companydata.findOne({_id: req.params.cid});
        if (comp == null) throw new Error();
        for(let i = 0; i < Math.min(MAX_VAC, req.params.no); i++){
            var nrn = Math.floor(Math.random() * fields.length);
            var cjobNature = fields[nrn];
            var cpositionName = comp.companyName + ' ' + cjobNature;
            var cemployMode = employment[Math.floor(Math.random() * 2)];
            var csalary = salary[Math.floor(Math.random() * salary.length)];
            
            var srn = Math.floor(Math.random() * skills.length) + 1;
            var cskills = [];
            for(let j = 0; j < srn; j++){
                cskills.push(skills[Math.floor(Math.random() * skills.length)]);
            }
            var cskill_text = cskills.join(', ');
            var cexperience = Math.floor(Math.random() * 10);
            var trn = Math.floor(Math.random() * 10)+1;
            var ctext = '';
            for(let j = 0; j < trn; j++){
                ctext+='.';
            }
            var ceducation = education[Math.floor(Math.random() * education.length)];
            var cemploy_type = employment[Math.floor(Math.random() * 2)];
            var copt_year = cexperience + Math.floor(Math.random() * 5);
            var mrn = Math.floor(Math.random() * 5) + 1;
            var cmajor = []
            for(let j = 0; j < mrn; j++){
                cmajor.push(study[Math.floor(Math.random() * study.length)]);
            }
            var copportunity = opportunity[Math.floor(Math.random() * opportunity.length)];


            const positionData = await position.create({
                positionName: cpositionName, 
                jobNature: cjobNature, 
                employMode: cemployMode, 
                salary: csalary, 
                skill_text: cskill_text, 
                education: ceducation, 
                text: ctext, 
                experience: cexperience,
                employment_type: cemploy_type, 
                opt_year: copt_year, 
                major: cmajor, 
                opportunity: copportunity,
                companyData: req.params.cid});
            comp.positions.set(positionData._id, cpositionName);
            await comp.save();
        }
        res.json({status: "Succesfully created "+req.params.no + " random vacancies for " + comp.companyName});

    }catch(err){
        console.log(err);
        return res.json({status: "error"});
    }
}

async function deleteAllCans(req, res){
    try{
        const cancount = await CandidateData.countDocuments();
        await CandidateData.deleteMany({});
        await UserCredential.deleteMany({role: 'CAN'});
        return res.json({status: 'Succesfully deleted ' + cancount+ ' candidates'});
    }catch(err){
        console.log(err);
        return res.json({status: "error"});
    }
}

async function deleteAllComps(req, res){
    try{
        const compCount = await companydata.countDocuments();
        await companydata.deleteMany({});
        await positiondata.deleteMany({});
        await UserCredential.deleteMany({role: 'COM'});
        return res.json({status: 'Succesfully deleted ' + compCount+ ' companies'});
    }catch(err){
        console.log(err);
        return res.json({status: "error"});
    }
}

async function deleteAllComps(req, res){
    try{
        const compCount = await companydata.countDocuments();
        await companydata.deleteMany({});
        await UserCredential.deleteMany({role: 'COM'});
        return res.json({status: 'Succesfully deleted ' + compCount+ ' companies'});
    }catch(err){
        console.log(err);
        return res.json({status: "error"});
    }
}

async function deleteAllVacs(req, res){
    try{
        const comp = await companydata.findOne({_id: req.params.cid});
        var posCount = await position.find({companyData: req.params.cid}).countDocuments();
        await position.deleteMany({companyData: req.params.cid});
        return res.json({status: 'Succesfully deleted ' + posCount+ ' vacancies for ' + comp.companyName});
    }catch(err){
        console.log(err);
        return res.json({status: "error"});
    }
}

async function createAdmin (req, res){
    try {
        try{
            const admin = await UserCredential.findOneAndUpdate({username: 'admin'}, {username: 'admin', role: 'ADMIN',model_type: 'NA'});
            admin.password = process.env.ADMIN_PW || 'notadmin123';
            await admin.save();
            res.json({status: "Admin reset successfully."})
        }catch(error){
        if (error.errors.password.properties.message === 'To short') console.log("too fucking short");
            const credential = await UserCredential.create({username: 'admin', password: 'notadmin123', role: 'ADMIN',model_type: 'NA'});
            // const token = await credential.generateAuthToken();
            res.json({status: 'Created new admin user'});
        }
    } catch (error) {
        console.log(error);
        if (error.code===11000) {
            return res.status(500).json({status: 'error', err_msg: 'Email already in use!'});
        }
        res.status(500).json(error);
    }
};
async function createAdmin (req, res){
    let caution = "";
    let admin;
    let password = "notadmin123";
    if (process.env.ADMIN_PW && process.env.ADMIN_PW.length>=8)
    {
        password = process.env.ADMIN_PW;
    }
    else
    {
        caution = "User defined password not set or too short, default password is used";
    }
        try{
            await UserCredential.create({username: 'admin', password, role: 'ADMIN',model_type: 'NA'});
            // const token = await credential.generateAuthToken();
            // status = 'Created new admin user';
            return res.json({status: 'Created new admin user',caution});
        }
        catch{
            admin = await UserCredential.findOneAndUpdate({username: 'admin'}, {username: 'admin', role: 'ADMIN',model_type: 'NA'});
        }
        try{
            admin.password = password;
            await admin.save();
            return res.json({status :"Admin reset successfully.",caution})
        }
        catch(error){
            res.status(500).json(error);
    }
}

module.exports = {
    generateCans,
    generateComps,
    deleteAllCans,
    deleteAllComps,
    generateVacancies,
    deleteAllVacs,
    createAdmin
}
