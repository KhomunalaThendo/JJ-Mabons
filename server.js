const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like your HTML form)
app.use(express.static("public")); // put your HTML inside a 'public' folder

// Route for handling form submission
app.post("/send", (req, res) => {
  const { fullnames,phone , email, message } = req.body;

  // Setup Nodemailer transporter (using Gmail here)
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "thendocomz@gmail.com", // replace with your email
      pass: "Music4pilots",   // use App Password if Gmail
    },
  });

  // Email options
  let mailOptions = {
    from: email,
    to: "thendocomz@gmail.com", // where you want to receive emails
    subject: `New message from ${fullnames}`,
    text: message,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Error sending message.");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Message sent successfully!");
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});