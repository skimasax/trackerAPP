const express = require("express");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });



//   const sendEmail = async (to, subject, text) => {
//     try {
//       const mailOptions = {
//         from: 'bimbo@gmail.com', // Replace with the sender's email address
//         to,
//         subject,
//         text,
//       };
  
//       const info = await transporter.sendMail(mailOptions);
//       console.log('Email sent: ' + info.response);
//       return ('email sent successfully');
//     } catch (error) {
//       console.error('Error sending email: ' + error);
//       throw new Error('Error sending email');
//     }
//   };

module.exports = transporter;
  
