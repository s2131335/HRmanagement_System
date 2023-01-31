const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AptestSchema = new Schema({
  title: {
    type: String,
  },
  set: {
    type: String,
  },
  ans: {
    type: String,
  },
  qid: {
    type: String,
  },
  option: [{
    oid: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  ],
},
);


module.exports = mongoose.model('AptestData', AptestSchema);
