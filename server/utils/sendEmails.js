const transporter = require("../config/connectionEmail");
require("dotenv").config();

async function sendEmailPassword(user, res) {
  try {
    console.log(user);
    let info = await transporter.sendMail({
      from: `"Lana & Pablo" <${process.env.REACT_APP_EMAIL}>`,
      to: `${user.email}`,
      subject: "Lana and Pablo wedding - Reset Password",
      text: `Please click this link to change your password <a href= http://localhost:3000/forgotpassword/user/${user._id}>`,
      html: `<body>
            <p>Hello ${user.name},</p>
            <p>There was a request to change your password!.\n
            If you did not make this request please ignore this email.
            Otherwise, please click this link to change your password <a href= http://localhost:3000/forgotpassword/user/${user._id}>
            </p>
            </body>`,
    });

    console.log("Message sent", info.messageId);
    return true;
  } catch (err) {
    console.error(err);

    return false;
  }
}

module.exports = sendEmailPassword;
