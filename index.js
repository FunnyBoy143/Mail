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
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
