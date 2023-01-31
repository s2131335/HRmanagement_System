const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalendarSchema = new Schema({
    date:{
        start : {type: String},
        end: {type: String}
    },
    year:{
        type: Number,
    },
    month:{
        type: Number,
    },
    day:{
        type: Number,
    },
    booked_candidate:{
        candidate_id:{
            type: Schema.ObjectId,
            default: null,
            ref: "Candidate"
        },
        candidate_name:{
            type: String,
            default: "接受預約"
        },
        vacancy_id:{
            type: Schema.ObjectId,
            default: null,
            ref: "Position"
        }
    },
    is_full:{
        type: Boolean,
        default: false
    }
})



module.exports = mongoose.model('CalendarData',CalendarSchema);