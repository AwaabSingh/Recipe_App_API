const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
   service: "Gmail",
   auth: {
     user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
   }
})

// exports.sendEmail = async (options) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     auth: {
//       user: process.env.SMTP_EMAIL,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });

//   const message = {
//     from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   const info = await transporter.sendMail(message);

//   console.log('Message sent: %s', info.messageId);
// }
 

exports.sendEmail = async (options) =>  {
   try {
    return await transporter.sendMail({
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      html: options.message
    })
   } catch (error) {
     console.log(error)
   }
}