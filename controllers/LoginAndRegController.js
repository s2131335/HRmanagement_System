const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const UserCredential = require('../database/models/UserCredential');

async function login(req, res, next) {
    try {
        const user = await UserCredential.findByCredentials(req.body.username, req.body.password);
        if (user.role === 'CAN') 
            return res.status(500).json({status: 'error', err_msg: '不允許登錄'});
        const token = await user.generateAuthToken();
        req.session.token = token;
        req.session.user = user;
        res.json({status: 'ok'});
    } catch (err) {
        res.status(500).json({status: 'error', err_msg: '電子郵件地址和密碼不匹配！'});
    }
  }


async function logout(req, res, next) {
    try {
        await UserCredential.findOneAndUpdate({_id:req.session.userid}, {token:""});
        req.session.destroy();
        res.redirect('/');
    } catch (err) {
        res.status(500).json({status: 'error', err_msg: 'Email and password do not match.'});
    }
}

async function register(req, res, next) {
    const {username, password} = req.body;
    try {
        const credential = await UserCredential.create({username, password, role: req.body.role||'USER',model_type: "NA"});
        // const token = await credential.generateAuthToken();
        res.json({status: 'ok'});
    } catch (error) {
        if (error.code===11000) {
        return res.status(500).json({status: 'error', err_msg: '電子郵件已被使用!'});
        }
 //       if (error.errors.password.message==='To short') {
   //     return res.status(500).json({status: 'error', err_msg: 'Password must be longer than 8 characters!'});
     //   }

        console.log(error);
        res.status(500).json(error);
    }
}

async function forget(req, res) {
    console.log(req.body);
    const user = await UserCredential.findOne({'username': req.body.username});
    if (!user) {
        return res.json({status: 'not-found', err_msg: 'Email not found!'});
    }
    if (user.role === 'CAN') 
            return res.status(500).json({status: 'error', err_msg: '不允許登錄'});
    const token = jwt.sign({_id: user.id}, 'resetkey', {expiresIn: '10m'});
    console.log(token);

    const data = {
        from: process.env.SENDER_EMAIL,
        to: req.body.username,
        subject: 'Password reset',
        html: `
                <h2>Click this link to reset password</h2>
                <p>http://${process.env.DOMAIN}:${process.env.PORT}/reset-password/${token}</p>
                <p>This link only last for 10 min</p>`,
    };

    try {
        await user.updateOne({resetlink: token});
        const transporter = nodeMailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: process.env.EMAIL_PORT || 587,
        secure: process.env.EMAIL_SECURE == true,
        auth: {
            user: process.env.SENDER_EMAIL, // put email here
            pass: process.env.SENDER_PASSWORD, // put password here
        },
        });
        transporter.sendMail(data, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({status: error});
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.json({status: 'ok'});
        });
    } catch (error) {
        return res.json({status: 'error', err_msg: 'link error'});
    }
}
  
async function reset_password(req, res) {
    const {resetlink, newpassword, username, password} = req.body;
    if(username && password){
        try{
            const user = await UserCredential.findByCredentials(req.body.username, req.body.password);
            user.password = newpassword;
            user.save();
            res.json({status: 'ok'});
        }catch(error){
            res.json(error);
        }
    }
    else {
        if (!resetlink) {
            return console.log('error');
        }
        try {
            jwt.verify(resetlink, 'resetkey');
            const user = await UserCredential.findOne({resetlink: resetlink});
            user.password = newpassword;
            user.save();
            res.json({status: 'ok'});
        } catch (error) {
            res.json(error);
        }
    }
}

module.exports = {
    login,
    register,
    forget,
    reset_password,
    logout,
  };
