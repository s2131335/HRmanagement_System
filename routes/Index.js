/* eslint-disable new-cap */
/* eslint-disable max-len */
const express = require('express');
const router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('login-portal', {title: 'Login'});
// });
const fs = require('fs');

let fields; let fields1; let fields2;
fs.readFile(__dirname + '/../public/JobNature_List_Chinese.csv', 'utf8', function (err, data) {
  if (!err) {
    fields = data.split(/\r?\n/);
    fields1 = fields.slice(0, fields.length / 2 + fields.length % 2);
    fields2 = fields.slice(fields.length / 2 + fields.length % 2);
  } else {
    console.error(err);
  }
});

let businessNature;
fs.readFile(__dirname + '/../public/BizNature.csv', 'utf8', function (err, data) {
  if (!err) {
    businessNature = data.split(/\r?\n/);
  } else {
    console.error(err);
  }
});


const test = [
  {
    'id': 'q1',
    'title': 'What is the LCM of 147/64 and 30/44?',
    // 'img': "",
    'options': [
      {
        'id': 'o11',
        // 'img':"",
        'text': 'O11',
      },
      {
        'id': 'o12',
        // 'img':"https://miro.medium.com/max/4800/1*OohqW5DGh9CQS4hLY5FXzA.png",
        'text': 'O12',
      },
      {
        'id': 'o13',
        // 'img':"https://miro.medium.com/max/4800/1*OohqW5DGh9CQS4hLY5FXzA.png",
        'text': 'O13',
      },
      {
        'id': 'o14',
        // 'img':"https://miro.medium.com/max/4800/1*OohqW5DGh9CQS4hLY5FXzA.png",
        'text': 'O14',
      },
    ],
  },
  {
    'id': 'q2',
    'title': 'A sum of Rs 7000 is deposited in two schemes. One part is deposited in Scheme A which offers 8% rate of interest. Remaining part is invested in Scheme B which offers 10% rate of interest compounded annually. If interest obtained in scheme A after 4 years is Rs 226 more than the interest obtained in scheme B after 2 years, find the part deposited in scheme B.',
    // 'img': "",
    'options': [
      {
        'id': 'o21',
        // 'img':"",
        'text': 'O21',
      },
      {
        'id': 'o22',
        // 'img':"https://miro.medium.com/max/4800/1*OohqW5DGh9CQS4hLY5FXzA.png",
        'text': 'O22',
      },
      {
        'id': 'o23',
        // 'img':"",
        'text': 'O23',
      },
      {
        'id': 'o24',
        // 'img':"https://miro.medium.com/max/4800/1*OohqW5DGh9CQS4hLY5FXzA.png",
        'text': 'O24',
      },
    ],
  },
  {
    'id': 'q3',
    'title': 'This is q3',
    // 'img': "",
    'options': [
      {
        'id': 'o31',
        // 'img':"",
        'text': 'O31',
      },
      {
        'id': 'o32',
        // 'img':"https://miro.medium.com/max/4800/1*OohqW5DGh9CQS4hLY5FXzA.png",
        'text': 'O32',
      },
      {
        'id': 'o33',
        // 'img':"",
        'text': 'O33',
      },
      {
        'id': 'o34',
        // 'img':"https://miro.medium.com/max/4800/1*OohqW5DGh9CQS4hLY5FXzA.png",
        'text': 'O34',
      },
    ],
  },
];

const districts = ['?????????', '??????', '??????', '?????????',
  '????????????', '?????????', '????????????', '????????????', '????????????',
  '?????????', '?????????', '??????', '?????????', '?????????', '?????????', '?????????', '?????????', '?????????'];

const study = ['??????', '??????', '??????', '??????', '??????', '??????', '??????', '?????????', '??????', '??????', '??????', '??????'];

router.get('/', function (req, res, next) {
  if (req.session.user != undefined) {
    switch (req.session.user.role) {
      case "ADMIN":
        res.redirect('internal/user-management');
        break;
      case "COM":
        res.redirect('comp');
        break;
      case "USER":
        res.redirect('user');
        break;
      case "CAN":
        res.redirect('candidate');
        break;
    }
  
  }else {
    res.render('public/login', { title: '????????????????????????' });
  }
});

router.get('/register', function (req, res, next) {
  res.render('public/register', { title: '????????????' });
});

router.get('/register-candidate', function (req, res, next) {
  res.render('candidate/register-candidate', {
    title: '??????????????????',
    districts,
    study,
    fields1,
    fields2
  });
});

router.get('/register-company', function (req, res, next) {
  res.render('company/register-company', {
    title: '????????????',
    districts,
    businessNature
  });
});

router.get('/forget', (req, res) => {
  res.render('public/forget', { title: '????????????' });
});

router.get('/reset-password/:token', (req, res) => {
  res.render('public/reset', { title: '????????????', token: req.params.token });
});


router.get('/user-calendar', (req, res) => {
  console.log('dllm');
  res.render('calendar/user-calendar', {
    title: '??????????????????',


  });
});

router.get('/ir56e', (req, res) => {
  res.render('candidate/ir56e', {
    title: 'IR56E??????',

  });
});
// router.get('/user-management', (req, res)=>{
//         // TODO check login
//         res.render('user-management', {title: 'HR'});
// })

module.exports = router;
