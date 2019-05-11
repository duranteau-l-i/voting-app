const Poll = require('../models/poll');

exports.getAllPoll = (req, res, next) => {
  Poll.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getPollById = (req, res, next) => {
  Poll.findOne({
    _id: req.params.id,
  })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(404).json({ success: false, error: error });
    });
};

exports.getPollsByName = (req, res, next) => {
  Poll.find({ user: req.params.name })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.createPoll = (req, res, next) => {
  Poll.findOneAndUpdate({ question: req.body.question }, req.body, { upsert: true })
    .then(data => {
      if (result !== null) {
        res.status(401).json({ success: false });
      } else {
        res.status(201).send(data);
      }
    })
    .catch(error => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.polling = (req, res, next) => {
  Poll.update(
    { 'options._id': req.params.id },
    {
      $inc: {
        'options.$.poll': 1,
      },
      $push: { voters: req.params.user },
    }
  )
    .then(() => {
      res.status(201).json({
        message: 'Poll updated successfully!',
      });
    })
    .catch(error => {
      res.status(401).json({
        error: error,
      });
    });
};

exports.deletePoll = (req, res, next) => {
  Poll.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: 'Deleted!',
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error,
      });
    });
};
