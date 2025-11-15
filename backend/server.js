const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

const PORT = 4000;

const allowedOrigins = [
  'http://127.0.0.1:5500'           // local development
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT"]
  })
);

app.post('/form', (req, res) => {
  const { name, email, message } = req.body;
  res.status(200).json({name, email, message});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})