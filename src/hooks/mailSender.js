import nodemailer from 'nodemailer'

export const mailSender = (subject) => {
  return async (context) => {
    var transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sadanandf@valueaddsofttech.com',
        pass: 'SadV@0103'
      }
    })
    //send out email
    let mailoptions = {
      from: 'Sadanand Fulari',
      to: `${context.data.email}`,
      subject: subject,
      text: `Your userName for login is :${context.data.userName} and password for login in app is : ${context.data.password}`
    }

    transport.sendMail(mailoptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent' + info.response)
      }
    })
  }
}
