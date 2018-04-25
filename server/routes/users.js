const express = require('express');
const router = express.Router();
const users = require('../models/users');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

let allUsers = [];

router.get('/users', (req, res, next) => {
  users.find({}, (err, docs) => {
    allUsers = [...docs];
    res.json(docs);
  });
});

router.post('/login', (req, res, next) => {
  const userName = req.body.name.toLowerCase();
  const userPassword = req.body.password;

  users.findOne({ name: userName, password: userPassword }, (err, docs) => {
    res.json(docs);
  });
});

router.post('/register', (req, res, next) => {
  const newUser = req.body;
  const userName = req.body.name;
  const userEmail = req.body.email;

  users.findOneAndUpdate(
    { email: userEmail },
    newUser,
    { upsert: true },
    (err, docs) => {
      if (docs === null) {
        res.json({ success: true, name: userName });
      } else {
        res.json({ success: false });
      }
    }
  );
});

router.post('/change-password', (req, res, next) => {
  const userName = req.body.name;
  const userCurrentPassword = req.body.currentPassword;
  const userNewPassword = req.body.newPassword;

  users.findOneAndUpdate(
    { name: userName, password: userCurrentPassword },
    {
      $set: {
        password: userNewPassword,
      },
    },
    { new: true },
    (err, docs) => {
      if (docs !== null) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    }
  );
});

module.exports = router;
