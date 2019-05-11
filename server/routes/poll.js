const express = require('express');
const router = express.Router();

const pollCtrl = require('../controllers/poll');

router.get('/polls', pollCtrl.getAllPoll);
router.get('/polls/:id', pollCtrl.getPollById);
router.get('/polls/user/:name', pollCtrl.getPollsByName);
router.post('/new-poll', pollCtrl.createPoll);
router.post('/polling/:id/:user', pollCtrl.polling);
router.delete('/delete-poll/:id');

module.exports = router;
