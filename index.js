const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const storage = multer.diskStorage({
  // destination: './upload/data',
 

  filename: (req, file, cb) =>{

      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
  
})

const upload = multer({
  storage: storage,
//  limits: {fileSize: 1024 * 1800}
})


app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.post("/api/form", upload.single('data'), (req, res) => {



  console.log(req.body);
  //Formating content to be send
  var emailcontent = `<h3> Contact Details</h3>
  <p align="center"><strong style="color:#55BDE8; font-size:3em; font-weight:bolder; text-align:center; margin:0px;">THANK YOU</strong><br /><br /></p>
                     <ul>
                      <li>name: ${req.body.name}</li>
                      <li>email : ${req.body.email}</li>
                     </ul>
                     <h2>Message</h2>
                      <p>message: ${req.body.subject}</p>
                          `;
  var data = req.file;
  console.log(data,"jjjjjjjjjjjjjjjjjjjjjjjjjj");
  if (data.size >= 15000000) {
    // url.push(data);
    return res.send({
      result: false,
      message: "Your file is greater then 15MB"
    });
  } else { 
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "funnyboy14143@gmail.com",
      pass: "jnbcmgbyxipezvfy"
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  //Preparing the mailOptions object
  var mailOptions = {
    from: `${req.body.email}`,
    to: "funnyboy14143@gmail.com",
    subject: "New Message",
    text: req.body.subject,
    html: emailcontent,
    attachments: [
      {
        filename: data.originalname,
        path : data.path
      }
     ]
  };
  //Sending email using transporter function
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return res.send({
        result: false,
        message: "Mail Not sent"
      });
    } else {
      console.log("Email sent: " + info.response);
      return res.send({
        result: true,
        message: "Mail sent"
      });
    }
  });
  // return res.send({
  //   result: true,
  //   message: "Mail sent"
  // });
}
});



app.post("/api/form-1", upload.single('data'), (req, res) => {

  console.log(req.body);
  //Formating content to be send
  var emailcontent = `
  <p align="center"><strong style="color:#55BDE8; font-size:3em; font-weight:bolder; text-align:center; margin:0px;">${req.body.title}</strong><br /><br /></p>
                          `;
  var data = req.file;
  console.log(data,"jjjjjjjjjjjjjjjjjjjjjjjjjj");
  if (data.size >= 15000000) {
    // url.push(data);
    return res.send({
      result: false,
      message: "Your file is greater then 15MB"
    });
  } else { 
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "funnyboy14143@gmail.com",
      pass: "jnbcmgbyxipezvfy"
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  //Preparing the mailOptions object
  var mailOptions = {
    from: `${req.body.email}`,
    to: "funnyboy14143@gmail.com",
    subject: "Resume",
    text: req.body.subject,
    html: emailcontent,
    attachments: [
      {
        filename: data.originalname,
        path : data.path
      }
     ]
  };
  //Sending email using transporter function
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return res.send({
        result: false,
        message: "Mail Not sent"
      });
    } else {
      console.log("Email sent: " + info.response);
      return res.send({
        result: true,
        message: "Mail sent"
      });
    }
  });
  // return res.send({
  //   result: true,
  //   message: "Mail sent"
  // });
}
});


//Form-2

app.post("/api/form-2", upload.single('data'), (req, res) => {

  console.log(req.body);
  //Formating content to be send
  var emailcontent = `
  <p align="center"><strong style="color:#55BDE8; font-size:3em; font-weight:bolder; text-align:center; margin:0px;">${req.body.title}</strong><br /><br /></p>
                     <ul>
                      <p style="font-size: 20px;"><b>Name :</b> ${req.body.name}</p>
                      <p style="font-size: 20px;"><b>Phone No :</b> ${req.body.phone}</p>
                      <p style="font-size: 20px;"><b>Type :</b> ${req.body.type}</p>
                     </ul>
                          `;
  // var data = req.file;
  // console.log(data,"jjjjjjjjjjjjjjjjjjjjjjjjjj");
  // if (data.size >= 15000000) {
  //   // url.push(data);
  //   return res.send({
  //     result: false,
  //     message: "Your file is greater then 15MB"
  //   });
  // } else { 
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "funnyboy14143@gmail.com",
      pass: "jnbcmgbyxipezvfy"
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  //Preparing the mailOptions object
  var mailOptions = {
    from: `${req.body.email}`,
    to: "funnyboy14143@gmail.com",
    subject: `${req.body.title}`,
    text: req.body.subject,
    html: emailcontent,
    // attachments: [
    //   {
    //     filename: data.originalname,
    //     path : data.path
    //   }
    //  ]
  };
  //Sending email using transporter function
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return res.send({
        result: false,
        message: "Mail Not sent"
      });
    } else {
      console.log("Email sent: " + info.response);
      return res.send({
        result: true,
        message: "Mail sent"
      });
    }
  });
  // return res.send({
  //   result: true,
  //   message: "Mail sent"
  // });
// }
});

//Form-3

app.post("/api/form-3", upload.single('data'), (req, res) => {

  console.log(req.body);
  //Formating content to be send
  var emailcontent = `
  <p align="center"><strong style="color:#55BDE8; font-size:3em; font-weight:bolder; text-align:center; margin:0px;">${req.body.title}</strong><br /><br /></p>
                     <ul>
                      <p style="font-size: 20px;"><b>Name :</b> ${req.body.name}</p>
                      <p style="font-size: 20px;"><b>Phone No :</b> ${req.body.phone}</p>
                      <p style="font-size: 20px;"><b>E-Mail :</b> ${req.body.mail}</p>
                      <p style="font-size: 20px;"><b>Description :</b> ${req.body.des}</p>
                     </ul>
                          `;
  // var data = req.file;
  // console.log(data,"jjjjjjjjjjjjjjjjjjjjjjjjjj");
  // if (data.size >= 15000000) {
  //   // url.push(data);
  //   return res.send({
  //     result: false,
  //     message: "Your file is greater then 15MB"
  //   });
  // } else { 
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "funnyboy14143@gmail.com",
      pass: "jnbcmgbyxipezvfy"
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  //Preparing the mailOptions object
  var mailOptions = {
    from: `${req.body.email}`,
    to: "funnyboy14143@gmail.com",
    subject: `${req.body.title}`,
    text: req.body.subject,
    html: emailcontent,
    // attachments: [
    //   {
    //     filename: data.originalname,
    //     path : data.path
    //   }
    //  ]
  };
  //Sending email using transporter function
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return res.send({
        result: false,
        message: "Mail Not sent"
      });
    } else {
      console.log("Email sent: " + info.response);
      return res.send({
        result: true,
        message: "Mail sent"
      });
    }
  });
  // return res.send({
  //   result: true,
  //   message: "Mail sent"
  // });
// }
});

//Form-4

app.post("/api/form-4", upload.single('data'), (req, res) => {

  console.log(req.body);
  //Formating content to be send
  var emailcontent = `
  <p align="center"><strong style="color:#55BDE8; font-size:3em; font-weight:bolder; text-align:center; margin:0px;">${req.body.title}</strong><br /><br /></p>
                     <ul>
                      <p style="font-size: 20px;"><b>Name :</b> ${req.body.name}</p>
                      <p style="font-size: 20px;"><b>Phone No :</b> ${req.body.phone}</p>
                      <p style="font-size: 20px;"><b>E-mail :</b> ${req.body.mail}</p>
                      <p style="font-size: 20px;"><b>Description :</b> ${req.body.des}</p>
                      <p style="font-size: 20px;"><b>Product :</b> ${req.body.product}</p>
                      <p style="font-size: 20px;"><b>Square Feet :</b> ${req.body.sqft}</p>
                     </ul>
                          `;
  // var data = req.file;
  // console.log(data,"jjjjjjjjjjjjjjjjjjjjjjjjjj");
  // if (data.size >= 15000000) {
  //   // url.push(data);
  //   return res.send({
  //     result: false,
  //     message: "Your file is greater then 15MB"
  //   });
  // } else { 
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "funnyboy14143@gmail.com",
      pass: "jnbcmgbyxipezvfy"
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  //Preparing the mailOptions object
  var mailOptions = {
    from: `${req.body.email}`,
    to: "funnyboy14143@gmail.com",
    subject: `${req.body.title}`,
    text: req.body.subject,
    html: emailcontent,
    // attachments: [
    //   {
    //     filename: data.originalname,
    //     path : data.path
    //   }
    //  ]
  };
  //Sending email using transporter function
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return res.send({
        result: false,
        message: "Mail Not sent"
      });
    } else {
      console.log("Email sent: " + info.response);
      return res.send({
        result: true,
        message: "Mail sent"
      });
    }
  });
  // return res.send({
  //   result: true,
  //   message: "Mail sent"
  // });
// }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
