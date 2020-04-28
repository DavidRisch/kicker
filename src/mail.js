module.exports = {
  sendConfirmationMail : sendConfirmationMail
}

// source from Nodemailer: https://nodemailer.com/about/

var nodemailer = require('nodemailer'); 

const userAddress  = '' // sender address
const userPassword = '' // password for the sender address 

var transporter = nodemailer.createTransport({
  service: '2go-mail',
  auth: {
    user: userAddress,
    pass: userPassword
  }
});

var confirmationMail = {
  from: userAddress,
  to: '',
  subject: "Confirmation",
  text: "Hello world?!",       // plain text body
  html: "<b>Hello world?!</b>" // html body
};  

async function sendConfirmationMail(receiver) {

  console.log("Sending message to '%s'", receiver);
  // set receiver
  confirmationMail.to = receiver
  // send the confrimation Mail
  let info = await transporter.sendMail(confirmationMail);
  
  console.log("Message sent: %s", info.messageId);

  return info;
}