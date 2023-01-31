# Appendix - Directory structure
  
  
This structure diagram only shows important files and directories, some miscellaneous files may not be shown.
  

```
hr_app/  
├── app.js                 // Main application  
├── .env                   // Environment variables
├── bin/  
├── controllers/           // Contain all controllers   
├── database/              // Contain database schema  
├── doc/                   // Contain documentation files  
├── email/                 // Contain email templates data  
├── middlewares/           // Contain middlewares  
├── pdf/                   // Contain unfilled IR56E, and all filled IR56E generated by the system  
├── public/                // Contain public accessable resources, including html files and scripts  
├── routes/                // Contain router files  
├── uploads/               // Save uploaded files  
└── views/                 // Contain all front-end files  
```
  
```
controllers/
├── AptestControllers.js                // Function related to apt test
├── CalendarController.js               // Function related to calendar
├── CandidateControllers.js             // Function related to candidates
├── CompanyUserControllers.js           // Function related to company user
├── FillPdf.js                          // Function related to pdf form filling
├── InternalUsersControllers.js         // Function related to internal users
├── LoginAndRegController.js            // Function related to login and registration
├── Testing.js                          // Function related to testing
└── UpDownload.js                       // Function related to download and upload
```
  
```
database/
├── apt-test.xlsx                       // Raw apt test question data in xlsx format
├── connectdb.js                        // Connect to database function
└── models
    ├── AptestData.js                   // Schema for apt test data
    ├── CalendarData.js                 // Schema for calendar data
    ├── CandidateData.js                // Schema for data of candidates
    ├── CompanyData.js                  // Schema for data of company
    └── UserCredential.js               // Schema for user credentials
```
  
```
email
├── email.html          // Email template
└── text.json           // Template setting
```

```
middlewares
├── authentication.js       // Function for authentication
├── authorization.js        // Function for authorization
└── updownload.js           // Function for file upload and download
```
  
```
public
├── BizNature.csv                       // CSV file for industry nature rendering
├── JobNature_List_Chinese.csv          // CSV file for job nature rendering
├── image
│   ├── email-logo.png                  // logo used for email
│   └── logo.png                        // logo to be displayed in the system
├── scripts
│   ├── calendar                        // Scripts for calendar
│   │   ├── bundle.js
│   │   ├── evo-calendar.min.js
│   └── util.js                         // Utilities
└── stylesheets                         // CSS files
    ├── calendar
    │   ├── evo-calendar.css
    │   ├── theme-basic.css
    ├── fonts
    └── style.css
```
  
```
routes
├── Aptest
│   └── Aptest.js                   // API routing related to apt test
├── Calendar
│   └── Calendar.js                 // API routing related to calendar
├── Candidate
│   └── candidate.js                // API routing related to candidates
├── Index.js                        // API routing related to front page rendering
├── Login&Reg
│   └── loginAndReg.js              // API routing related to login and registration
├── Testing
│   └── testing.js                  // API routing related to testing
├── UpDownload
│   └── UpDownloadRoute.js          // API routing related to file download and upload
├── company
│   └── CompanyUser.js              // API routing related to company users
└── internal
    └── InternalUsers.js            // API routing related to internal users
```
  
```
views
├── admin
│   ├── email-template.pug
│   ├── new-user.pug
│   ├── user-management.pug
│   ├── vacancy-candidates.pug
│   ├── vacancy-info.pug
│   ├── vacancy-interview.pug
│   ├── vacancy-management.pug
│   └── vacancy-shortlisted.pug
├── apttest
│   ├── apt-test.pug
│   └── finish.pug
├── calendar
│   └── user-calendar.pug
├── candidate
│   ├── index.pug
│   ├── interview.pug
│   ├── ir56e.pug
│   └── register-candidate.pug
├── company
│   ├── register-company.pug
│   ├── vacancy-info.pug
│   ├── vacancy-management.pug
│   └── vacancy.pug
├── public
│   ├── error.pug
│   ├── forget.pug
│   ├── layout.pug
│   ├── login.pug
│   ├── register.pug
│   ├── reset.pug
│   └── ss.pug
└── user
    ├── account.pug
    └── nav.pug
```
  