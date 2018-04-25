const express = require('express');
const router = express.Router();
const polls = require('../models/polls');
const bodyParser = require('body-parser');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


router.get('/polls', (req, res, next) => {
  polls.find({}, (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
});

router.get('/polls/:id', (req, res, next) => {
  const data = req.params.id;
  polls.findById(data, (err, docs) => {
    if(docs !== null) {
      res.json(docs);
    } else {
      res.json({success: false});
    }
  });
});

router.get('/polls/user/:name', (req, res, next) => {
  const data = req.params.name;
  polls.find({ user: data}, (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
});

router.post('/new-poll', (req, res, next) => {
  const data = req.body;
  polls.findOneAndUpdate({question: req.body.question} , data, {upsert: true}, (err, result) => {
    if(err) throw err;
    if (result !== null) {
      res.json({ success: false });
    } else {
      res.send(result);
    }
  });
});

router.post('/polling/:id/:user', (req, res, next) => {
  const id = req.params.id;
  const user = req.params.user;
  polls.update({'options._id': id}, {$inc: {
    'options.$.poll' : 1}, $push: {voters: user}}, (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
});

router.delete('/delete-poll/:id', (req, res, next) => {
  const id = req.params.id;
  polls.findByIdAndRemove(id, (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
});

module.exports = router;
