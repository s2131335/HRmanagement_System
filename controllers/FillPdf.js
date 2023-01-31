const path = require('path');
const candidateData = require('../database/models/CandidateData');
const {companydata, position} = require('../database/models/CompanyData');
const pdfFill = require('pdftk-fill-pdf-options').default;
var fs = require('fs');


async function fillPdf(canId,posId,IR56E){
  const {
    start_of_employment,
    basic_salary,
    monthly_subsidy,
    residence_provided,
    residence_address,
    residence_type,
    rent_by_employer,
    rent_by_employee,
    rent_returned_to_employee,
    rent_paid_to_employer,
    nonHK_company_name,
    nonHK_company_address,
    stock_option,
    nonfixed_income,
    overseas
} = IR56E;

    let candidate = await candidateData.findById(canId); 
    let positions = await position.findById(posId).populate('companyData');
    let sourcePDF = __dirname+ '/../pdf/ir56e.pdf';
    let destinationPDF =  __dirname+ `/../pdf/${candidate.first_name}${candidate.last_name}-ir56e.pdf`;
    const registerNumber = positions.companyData.registerNumber
    let buffer;
    let data = {
      "Clear Employee's Data and Income Details": "",
      "Check Box - Replacement IR56 Form": "",
      "Replacement Date": "",
      "Replacement Year": "",
      "Replacement Month": "",
      "Replacement Day": "",
      "Section Number of Employer 's File": "",         
      "Employer's File Number": "",                     
      "Employer's HKID Number": positions.companyData.HKID,
      "Name of Employer": positions.companyData.companyName,
      "Address of Employer": positions.companyData.address,
      "Title - Mr": "Yes",
      "Title - Ms": "Yes",
      "Title - Miss": "Yes",
      "English Name": `${candidate.last_name},${candidate.first_name} `,
      "Chinese Name": candidate.chinese_name,
      "HKID Number - Prefix": `${candidate.hkid.substring(0,(candidate.hkid.length==9)? 2:1)}`,
      "HKID Number - Digits": `${candidate.hkid.substring((candidate.hkid.length==9)? 2:1,(candidate.hkid.length==9)? 8:7)}`,
      "HKID Number - Check Digit": `${candidate.hkid[(candidate.hkid.length==9)? 8:7]}`,
      "Employee's Passport Details": "",
      "Indicator - Sex": candidate.gender,
      "Indicator - Marital Status": `${parseInt(candidate.marriage)+1}`,
      "Name of Employee's Spouse": candidate.spouse_name,
      "Spouse's HKID Number or Passport Details": candidate.spouse_hkid,
      "Residential Address": candidate.address,
      "Postal Address": candidate.mail_address,
      "Capacity Engaged": positions.positionName,   //position
      "Commencement Date": start_of_employment,
      "Amount - Fixed Income": basic_salary,
      "Amount - Allowance": monthly_subsidy,
      "Amount - Fluctuating Income": nonfixed_income,
      "Indicator - Place of Residence Provided": residence_provided,
      "Residence Provided - Address_1": residence_address,
      "Residence Provided - Nature_1": residence_type,
      "Residence Provided - Rent Paid to Landlord by Employer_1": rent_by_employer,
      "Residence Provided - Rent Paid to Landlord by Employee_1": rent_by_employee,
      "Residence Provided - Rent Refunded to Employee by Employer_1": rent_returned_to_employee,
      "Residence Provided - Rent Paid to Employer by Employee_1": rent_paid_to_employer,
      "Indicator - Sum Paid by Non-HK Company": overseas,
      "Name of Non-HK Company": nonHK_company_name,
      "Address of Non-HK Company": nonHK_company_address,
      "Indicator - Share Option": stock_option,
      "Date of Signing": "",
      "Indicator - Form Completed": "",
      "Designation": "",
      "Name Of Signer": ""
  };
  if (candidate.gender === "M")
  {
    data['Title - Mr'] = "";
  }
  else if (candidate.marriage === "0")
  {
    data['Title - Miss'] = "";
  }
  else
  {
    data['Title - Ms'] = "";
  }
  if (registerNumber[3] === '-'){
    data["Section Number of Employer 's File"] = registerNumber.substring(0,3);
    data["Employer's File Number"] = registerNumber.substring(4, registerNumber.length);
  }
  else {
    data["Employer's File Number"] = registerNumber;
  }

  if (data["Indicator - Share Option"] === "1" && !candidate.IR56E.file){
    buffer = candidate.IR56E.file;
    // console.log(file);
  }
  try {

    const pdfBuffer = await pdfFill.fill({
        pdfPath: sourcePDF,
        data: data,
        // optional, temporary file path root
        tempPath: __dirname + '/../pdf/',
      });
      // console.log(pdfBuffer);
      fs.writeFileSync(destinationPDF, pdfBuffer, { encoding: 'utf8' });
    } catch (err) {
      console.log(err);
    }
    // console.log(start_of_employment);
    return {destinationPDF,compName: positions.companyData.companyName,canName: candidate.chinese_name,compMail: positions.companyData.email,buffer};

  }

module.exports = {fillPdf};

