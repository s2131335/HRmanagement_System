const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
  positionName:{
    type: String,
    required: [true, 'Position name must be entered'],
  },
  jobNature: {
    type: Array,
    of: String,
    default:[]
  },
  employMode: {
    type: String,
  },
  salary: {
    type: String,

  },
  skill_text: {
    type: String,
    default: "-"
  },
  education:{
    type: Array,
    of: String,
  },
  text:{
    type: String,
  },
  experience:{
    type: String,
  },
  companyData:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyData',
  },
  file:{
    type: Buffer,
    default: null,
  },
  cert:{
    type: String,
    default: "-",
  },
  major: {
    type: Array,
    of: String,
    default:[]
  },
  employment_type:{
    type: String
  },
  opt_year:{
    type: String,
  },
  opportunity:{
    type: String,
    default: "-"
  },
  shortlisted:{
    type: Array,
    of: String,
    default: []
  },
  interviewed:{
    type: Array,
    of: String,
    default: []
  },

});

const CompanyDataSchema = new mongoose.Schema(
    {
      companyName: {
        type: String,
        required: [true, 'Company name must be entered'],
        unique: true,
      },  
      industry:{
        type: Array,
        required: true,
      },
      registerNumber: {     // HKID 2 choose 1
        type: String,
        // required: [true, 'Register number must be entered'],
      },
      HKID: {       //registerNumber 2 choose 1
        type: String,
      },
      address: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      contactName: {
        type: String,
        required: true,
      },
      district:{
        type: String,
        required: true,
      },
      positions: {
        type: Map,
        of:String,
        default: {},
        // mongoose.Schema.Types.ObjectId,
      },

    },
);
const companydata = mongoose.model('CompanyData', CompanyDataSchema);
const position = mongoose.model('Position', PositionSchema);

module.exports = {companydata, position};
