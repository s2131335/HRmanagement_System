const {companydata,position} = require('../database/models/CompanyData');
const mongoose = require('mongoose');
const UserCredential = require('../database/models/UserCredential');
const CandidateData = require('../database/models/CandidateData');

async function companyUpload(req,res,next){
    // return console.log(req);
    let {size,mimetype,path} = req.file;
    let types = ['pdf']; // file type
    let tmpType = mimetype.split("/")[1];
    try{
        if(size>500000)
            throw new Error({err:-1,msg:"too big"});
        if(types.indexOf(tmpType)==-1)
            throw new Error({err:-2,msg:"wrong type"});
        
        console.log(req.body);
        const id = mongoose.Types.ObjectId(req.params.id);
        // console.log(id);
        company = await companydata.find({"_id":req.session.user.database});
        // console.log(company[0].positions.get(id));
        if(company[0].positions.get(id)==undefined) throw new Error();
        positions = await position.findOne({"_id":id});
        positions.file = req.file.buffer;
        await positions.save();
        
    }
    catch (error){
        console.log(error);
        return res.status(500).send("failed");
    }
    res.json({"status": "ok"});

        // let url = `/upload/${req.file.filename}`     //enable if local storage is needed
        // res.status(200).send(req.session.user);
}

async function candidateUpload(req,res,next){
    // return console.log(req);
    let {size,mimetype,path} = req.file;
    let types = ['pdf']; // file type
    let tmpType = mimetype.split("/")[1];
    try{
        if(size>500000)
            throw new Error({err:-1,msg:"too big"});
        if(types.indexOf(tmpType)==-1)
            throw new Error({err:-2,msg:"wrong type"});

        const id = mongoose.Types.ObjectId(req.params.id);
        // console.log(id);
        can = await UserCredential.findOne({"_id": id});
        can.file = req.file.buffer;
        await can.save();
    }
    catch (error){
        console.log(error);
        return res.status(500).send("failed");
    }
    res.json({"status": "ok"});
}

async function ir56eUpload(req,res,next){
    // return console.log(req);
    let {size,mimetype,path} = req.file;
    let types = ['pdf']; // file type
    let tmpType = mimetype.split("/")[1];
    console.log(req.file.buffer);
    try{
        if(size>500000)
            throw new Error({err:-1,msg:"too big"});
        if(types.indexOf(tmpType)==-1)
            throw new Error({err:-2,msg:"wrong type"});

        // console.log(id);
        let can = await CandidateData.findOne({"_id": req.params.id});
        can.IR56E.file = req.file.buffer;
        await can.save();
        // console.log(can);
    }
    catch (error){
        console.log(error);
        return res.status(500).send("failed");
    }
    res.json({"status": "ok"});
}

// async function deleteCV(req, res){
//     try{
//         if (req.body.positionID!=undefined){
//             const id = mongoose.Types.ObjectId(req.body.positionID);
//             company = await companydata.find({"_id":req.session.user.database});
//             // console.log(company[0].positions.get(id));
//             if(company[0].positions.get(id)==undefined) throw new Error();
//             const positions = await position.findOne({"_id":req.body.positionID});
//             positions.file = null;
//             await positions.save();
//         }
//         else{
//             if (req.session.user.role == 'COM') throw new Error();
//             req.session.user.file = null;
//             await req.session.user.save();
//         }
//     }
//     catch (error){
//     return res.status(500).send("failed");
// }
//     res.status(200).send("ok");
// }

async function deleteJobad(req, res){
    try{
        company = await companydata.findOne({"_id":req.session.user.database});
        if(company.positions.get(req.params.id)==undefined) throw new Error();
        const pos = await position.findOne({"_id":req.params.id});
        pos.file = null;
        await pos.save();
        return res.json({status: "ok"});
    }catch(error){
        console.log(error);
        return res.status(500).json({status: "error"});
    }
}

async function jobadView(req,res){
    try{
        company = await companydata.findOne({"_id":req.session.user.database});
        if(company.positions.get(req.params.id)==undefined) throw new Error();
        const pos = await position.findOne({"_id":req.params.id});
        var tmp = pos.file;
        if(tmp==null) return res.send('No job ad uploaded');
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="js.pdf"');
        res.status(200).send(tmp);
    }catch(error){
        console.log(error);
        return res.status(500).send("failed");
    }
}

async function cvView(req, res){
    try{
        let can = await UserCredential.findOne({database: req.params.id, role:"CAN"});
        var tmp = can.file;
        if (tmp == null) throw new Error();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="js.pdf"');
        res.status(200).send(tmp);
    }
    catch (error){
        console.log(error);
        return res.status(500).send("沒有找到簡歷");
    }   
}    

module.exports = {
    companyUpload,
    candidateUpload,
    ir56eUpload,
    // deleteCV,
    deleteJobad,
    cvView,
    jobadView
};