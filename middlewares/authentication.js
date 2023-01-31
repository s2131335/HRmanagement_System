const UserCredential = require('../database/models/UserCredential');
const CompanyData = require('../database/models/CompanyData');
const CandidateData = require('../database/models/CandidateData');
const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
  
// }

module.exports = async (req, res, next) => {
  try {
    // const token = req.header('Authorization').replace('Bearer ', '');
    const token = req.session.token;
    // const token = req.body.token;
    const decoded = jwt.verify(token, 'authkey');
    const user = await UserCredential.findOne({'_id': decoded._id, 'tokens.token': token});
    req.session.user = user;
    if (!user) {
      throw new Error();
    }
    if (user.role !== 'ADMIN' && user.role !== 'USER') {
      req.session.user = await user.populate('database');
    }
    next();
  } catch (err) {
    // console.log(err);
    console.log("Not permitted, redirect");
    res.status(400).redirect('/');
    // res.status(401).send({error: 'Please login.'});
  }
};


