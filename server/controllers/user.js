const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.getAllUser = (req, res, next) => {
  User.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.login = (req, res, next) => {
  const userName = req.body.name.toLowerCase();
  User.findOne({ name: userName })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: new Error('User not found!'),
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(data => {
          res.status(201).json({ _id: user._id, name: user.name, role: user.role });
        })
        .catch(error => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: hash,
      role: 'user',
    });
    User.findOneAndUpdate({ email: user.email, name: user.name }, user, { upsert: true })
      .then(data => {
        console.log(data);
        if (data === null) {
          res.status(201).json({ success: true, name: user.name });
        } else {
          res.status(401).json({ success: false });
        }
      })
      .catch(error => {
        res.status(401).json({ success: false, error: error });
      });
  });
};

exports.changePassword = (req, res, next) => {
  User.findOne({ name: req.body.name })
    .then(user => {
      if (!user) {
        return res.status(401).json({ success: false });
      }
      bcrypt
        .compare(req.body.currentPassword, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ success: false });
          }
          bcrypt.hash(req.body.newPassword, 10).then(hash => {
            User.updateOne({ name: req.body.name }, { password: hash })
              .then(data => {
                console.log('data: ' + data);
                if (data !== null) {
                  res.status(201).json({ success: true });
                } else {
                  res.status(401).json({ success: false });
                }
              })
              .catch(error => {
                res.status(500).json({
                  error: error,
                });
              });
          });
        })
        .catch(error => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        error: error,
      });
    });
};
