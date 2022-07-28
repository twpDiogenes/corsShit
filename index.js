// const port = 3000 || process.env.PORT
const nodemailer = require("nodemailer");
const cors = require("cors");

var express = require('express'),
  app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(cors())

app.use(bodyParser.json());

app.get('/', function (req, res) {
  console.log("htmlData");
//   var username = req.body.username;
//   var htmlData = 'Hello:' + username;
  res.send('htmlData');
});


// app.post('/deleteUser', function (req, res) {
//   // getAuth()
//   // .deleteUser(uid)
//   // .then(() => {
//   //   console.log('Successfully deleted user');
//   // })
//   // .catch((error) => {
//   //   console.log('Error deleting user:', error);
//   // });
//   // res.send(htmlData);
// });


app.post('/sendMail', async function (req, res) {
  let transporter = nodemailer.createTransport({
    host: "mail.saltupra.com",
    port: 587,
    secure: false,
    auth: {
      user: "noreply@saltupra.com",
      pass: "@qc-ri,9X%5o"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let info = await transporter.sendMail({
    from: 'noreply@saltupra.com',
    to: req.body.email,
    subject: 'RECEPTION DU FORMULAIRE ID:' + req.body.formId + ' DE GES-UPRA',
    text: 'Bonjour.\n\nVeuillez trouver ci-joint le formulaire ' + req.body.formId + ' qui vous a été transmis.' + '.\nCordialement,\nL\'équipe GES-UPRA.',
    html: "<b>" + 'Bonjour.\n\nVeuillez trouver ci-joint le formulaire ' + req.body.formId + ' qui vous a été transmis.' + '\nCordialement,\nL\'équipe GES-UPRA.' + "</b>",
    attachments: [
      {
        path: req.body.pdf,
      }
    ]
  });
  console.log("Message sent: %s", info.messageId);
  res.send("Mail envoyé avec succès." + req.body.mail);
});

app.listen(3000, ()=>{
  console.log('App listening');
});