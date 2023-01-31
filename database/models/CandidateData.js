/* eslint-disable max-len */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
    email:{
        type: String,
    },
    chinese_name:{
        type: String,
        //required: true
    },
    title:{
        type: String,
    },
    first_name:{
        type: String,
        ////required: true
    },
    last_name:{
        type: String,
        ////required: true
    },
    hkid:{
        type: String,
        /////required: true
    },
    gender:{
        type: String,
        //required: true
    },
    marriage:{          
        type: String,    // 1: married, 0: unmarried
        //required: true,
    },
    spouse_name:{
        type: String,
    },
    spouse_hkid:{
        type: String,
    },
    spouse_loc:{
        type: String,
    },
    district:{      
        type: String,    // 1: 中西區, 2: 東區, 3: 南區, 4: 灣仔區, 5: 九龍城區, 6: 觀塘區, 7: 深水埗區, 8: 黃大仙區,
                        // 9: 油尖旺區, 10: 離島區, 11: 葵青區, 12:北區, 13: 西貢區, 14: 沙田區, 15: 大埔區, 16: 荃灣區,
                        // 17: 屯門區, 18: 元朗區
        //required: true,
    },
    address:{
        type: String,
        //required: true
    },
    mail_address:{
        type: String,
        //required: true
    },
    education:{           //list , tick box
        type: String,
        //required: true
    },
    institution_name:{
        type: String,
    },
    name_of_degree:{
        type: String,
        //required: true
    },
    study:{     //學科分類, 理學, 工程學, 醫學, 人文及社會科學, 農學, 文學, 歷史學, 哲學, 經濟學, 管理學, 法學, 教育學, 藝術學
        type: String,
        //required: true
    },
    GPA:{                         // if have
        type: String,
    },
    interested_industry:{  //refer to excel
        type: Array,
        of: String,
        default:[]
        //required: true
    },
    skills:{
        type: String,
        //required: true
    },
    related_work_experience:{
        type: String,
        //required: true
    },
    expected_salary:{       // 1: <$9999, 2: $10000-$14999, 3: $15000-$19999, 4: $20000-$24999, 5: $25000-$29999, 6: $30000-$34999, 7: $35000-$39999, 
                            //8: $40000-$44999, 9: $45000-$49999, 10: $50000-$54999, 11: $55000-$55999, 12: $60000-$64999, 13: $65000-$69999,
                            //14: $70000-$74999, 15: $75000-$79999, 16: $80000-$84999, 17: $85000-$89999, 18: $90000-$94999, 19: $95000-$100000,
                            //20: 自己填
        type: String,
        //required: true
    },
    salary_range:{
        type : String,
    },
    employment:{
        type: String,      //0: part_time, 1: full_time
        //required: true
    },
    CV:{
        //type: String,
    },
    aptest_score:{
        type: Number,
        default: 0, //
    },
    IR56E:{
        file:{
            type: Buffer,
            default: null,
        },
        start_of_employment: {  //僱用開始日期
            day:{
                type: String, 
                default: 0
            },
            month:{
                type: String,
                default: 0
            },
            year:{
                type: String,
                default: 0
            }
        },
        basic_salary:{             //每月的固定入息
            type: String,
            default: 0
        },
        monthly_subsidy:{       //每月的津貼
            type: String,
            default: 0
        },
        non_regular_income:{          //非固定的入息
            type: String,
            default: 0
        },                               //提供居所詳情
        residence_provided:{          // 0: 沒有提供, 1: 有提供
            type: String,
            default: "0"
        },     
        residence_address:{
            type: String,
            default: ""
        },
        residence_type:{          //類型: 獨立屋、樓宇單位、服務式住宅、所佔酒店房間的數目等
            type: String,
            default: ""
        },
        rent_by_employer:{    //由僱主付給業主的每月租金(港元)
            type: String,
            default: ""
        },
        rent_by_employee:{    //由僱員付給業主的每月租金(港元)
            type: String,
            default: ""
        },
        rent_returned_to_employee:{ //由僱主發還給僱員的每月租金(港元)
            type: String,
            default: ""
        },
        rent_paid_to_employer:{ // 由僱員付給僱主的每月租金(港元)
            type: String,
            default: ""
        },
                            //僱員的全部入息是否由非香港公司在本港或其他地區支付
        paid_by_non_HK_company:{     // 0: 否, 1: 是
            type: String,
            default: "0"
        },              
        nonHK_company_name:{     //該非香港公司名稱
            type: String,
            default: ""
        },
        nonHK_company_address:{       //地址
            type: String,
            default: ""
        },
        stock_option:{      //僱員是否在受僱於香港工作前，已獲有條件地授予股分認購權，規定他要在香港提供了服務後才可行使這些認購權
                type: String,  // 0: 否, 1: 是
                default: "0"
        },  
        // position:{      //職位
        //     type: String,
        //     default: 0
        // },
    }
})


module.exports = mongoose.model('Candidate', CandidateSchema);
