require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const serviceAcctPath = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) || require("./cpg-portfolio-firebase-adminsdk.json");

const serviceAccount = require(serviceAcctPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:"https://cpg-portfolio.firebaseio.com"
});

const db = admin.firestore();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  family: 6,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
});

const sendNotification = async (contact) => {
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `New message from ${contact.name}`,
      text: `Name: ${contact.name}\nEmail: ${contact.email}\nMessage: ${contact.message}`,
      // html: <a href="">Click here to see the message on the site</a>
    })
  } catch (error) {
    console.warn("Email not sent:", error.message || error);
  }
  
}

const app = express();

app.use(express.json());

const PORT = 4000;

app.use(cors());

app.get("/contacts", async (req, res) => {
  try {
    const snapshot = await db.collection("contacts")
      .orderBy("receivedAt", "desc")
      .limit(100)
      .get();

    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    let emptyFields = [];

    if (!name) {
      emptyFields.push('name');
    }
    if (!email) {
      emptyFields.push('email');
    }
    if (!message) {
      emptyFields.push('message');
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({error: 'Please fill in on all fields', emptyFields})
    }

    const contact = {
      name,
      email,
      message,
      receivedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection('contacts').add(contact);
    await sendNotification(contact);

    res.status(200).json({ id: docRef.id, mssg: " Message sent successfully!" })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" })
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
