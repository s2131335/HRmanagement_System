const nodeMailer = require('nodemailer');
const fs = require('fs');
const candidates = require('../database/models/CandidateData');
const path = require('path');
        
  async function massmail(req,res){
    // let b = await fs.readFileSync("/Users/kkl/Downloads/Media_kit.pdf", {flag:'r'})
    // console.log(b);
      // const recipants = req.body.recipants;
      recipants = ["1","2","3","4","5","6","7","8","9","10"];
      
      const transporter = nodeMailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: process.env.EMAIL_PORT || 587,
        secure: process.env.EMAIL_SECURE == true,
        pool:true,
        auth: {
          user: process.env.flashback_Email, // put email here
          pass: process.env.flashback_PW, // put password here
        },
      });
      
      const maillist = [
      // "mixlaw8@gmail.com",
      "s31627871@gmail.com",
    ];
    // data.to = maillist;
    for(let i = 0; i < 70; ++i){
      recipant = "recipants[i]";
      let data = {
        from: process.env.flashback_Email,
        to:"s31627871@gmail.com",
        subject: '【全新單曲、全新創作概念！】The Flashback推出2022年首支單曲Crucifixion (Reprise)',
        html: `
        <p>Dear${recipant}</p>
        <p>你好，我是香港獨立樂團The Flashback的經理人Season。這次來信是想跟你分享The Flashback的近況：我們已經發布了全新陣容後的第一首單曲及MV《Crucifixion (Reprise)》，正式離開首張專輯Comfort Zone、踏入第二階段 Inner Self！</p>
        
        <p>新的陣容，新的音樂概念，由改編舊曲開始。The Flashback在2022年重新構想《Crucifixion (Reprise)》，在編曲上增添新成員擅長的Metalcore及Emo Rock元素。同時，我們亦剪輯了這一年來在香港各地演出的片段，將凌碎的閃回片段拼湊在一起，成為了Crucifixion (Reprise)的Live MV。</p>
        -
        <p>New Era of The Flashback - Inner Self 
        Chapter 1: Crucifixion (Reprise)
        【罪惡與救贖】</p>
  
              <p>凝視內心的罪惡，重新思索受難的意義。</p>
  
              <p>這是一趟自我救贖的旅程。
              立即觀看MV: https://www.youtube.com/watch?v=5TcAHz-D4oI </p>
  
  
              <p>以及到各大串流平台收聽歌曲 - https://distrokid.com/hyperfollow/theflashback1/crucifixion-reprise-feat-chickenbor
              -
              如果你也喜歡這首歌曲，歡迎幫忙分享出去、讓世界各地的獨立樂迷也能認識我們！香港獨立樂團The Flashback於2018年正式成立，並於去2021年發布首張專輯《Comfort Zone》。如有任何演出、宣傳等等的合作機會，歡迎隨時聯絡我們，謝謝！</p>
  
              <p>Best,<br>
              Season Chan<br>
              Manager of The Flashback <br>
              Contact: (+852) 90215186 <br>
              flashbackhk@gmail.com<br>
              m.me/theflashbackhk <br>
              </p><br>
              <a href="https://drive.google.com/file/d/1UV_L0xMrtmsIzLN8V1PAFolfEbXX66iZ/view">*附上我們的Media Kit<a><br>
              ------------------------------------------------------<br>
              The Flashback的社交平台：<br>
              Facebook: https://www.facebook.com/theflashbackhk/ <br>
              Youtube: https://www.youtube.com/c/TheFlashbackHK <br>
              Instagram: https://www.instagram.com/theflashback_hk/  <br>
              Twitter: https://twitter.com/theflashbackhk <br><br>
  
              The Flashback的串流平台：<br>
              Spotify: https://open.spotify.com/artist/02IUgITGu9KW3KNfr9vM4p?si=be247h3kRS-mt_e1MMWB3w <br>
              Apple Music: https://music.apple.com/hk/artist/the-flashback/1448011860?l=en <br>
              KKBOX: https://www.kkbox.com/hk/tc/artist/PayPdpTSBoelBuxsYS <br><br>
  
              The Flashback過往推出的MV作品：<br>
              Dawn: https://youtu.be/yYocP8U9vLA<br>
              Crawling in the dark: https://youtu.be/UrzbadCZWdo  <br>
              Replay: https://youtu.be/YPMEpZYY6c4  <br>
              Hash: https://youtu.be/qKi6lSnabCM `,
      };
      transporter.sendMail(data, (error, info) => {
        if (error) {
          res.status(500).json({"status":"failed",error});
        } else {
          // res.status(200).json({"status":"ok"});
        }
      });}
      // res.status(200).json({"status":"ok"});

      // let success = [];
      // let failed = [];
      // await mail(transporter,maillist,data,success,failed);  
      // if (success.length == 0) {
      //   res.status(500).json({status: 'SumTing Wong',failed});
      // }
      // else{
      //   res.status(200).json({status: 'ok',success, failed});
      // }
  }

module.exports = {massmail};

// const send = (transporter, mailOptions) => {
//   return new Promise((resolve, reject) => {
    
//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           return reject(error);
//         } else {
//           return resolve();
//         }
//       });
//   });
//   };

//   const mail = (transporter,maillist,data,success,failed) => {
//     return new Promise((resolve, reject) => {
//       maillist.forEach(async (recipant,i)=>{
//         data.to = recipant;
//         try{
//           // transporter.sendMail(data, (error, info) => {
//           //   if (error) {
//           //     failed.push({ success: false, message: error});
//           //   } else {
//           //     success.push({ success: true, recipant});
//           //   }
//           // });
//           await send(transporter,data)
//                 .then(() => {success.push({ success: true, recipant});})
//                 .catch(err => {failed.push({ success: false, message: err});});
//           if (i === maillist.length - 1) {
//             if (failed.length === maillist.length) {
//               return reject({ failed });
//             } else {
//               return resolve({ success, failed });
//             }
//           }
//           return resolve();
//       }catch(e){
//       console.log(e);
//       return reject();
//       }
//       });
//     });
//     };

