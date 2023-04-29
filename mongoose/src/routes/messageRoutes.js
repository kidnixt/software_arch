const express = require('express');
const Message = require('../models/messages.js');
const User = require('../models/user.js');
const worker = require('../services/worker.js');
const router = express.Router();

router.post('/messages', async (req, res) => {
    const message = new Message(req.body);
    console.log(message)
    const id = req.body.user;
    try {
        User.findById(id).then((user) => {
            if (!user) {
                return res.status(404).send("User not found");
            }
            console.log(message.words)
            worker.producer(message.words).then((result) => {
                message.words = result;
                console.log(message.words)
                message.save();
                res.status(201).send(message);

            })   
        })
    } catch (e) {
        res.status(400).send();
    }

  });

router.get('/messages', (req, res) => {
    Message.find({}).sort({ createdAt: -1 }).then((messages) => {
        res.send(messages);
    }).catch((e) => {
        res.status(500).send();
    })
});

router.get('/messages/:id', (req, res) => {
    const id = req.params.id;
    Message.find({ user: id }).sort({ createdAt: -1 }).then((messages) => { //los imprimo al reves porque mongo ya los ordena de forma ascendente, je
        if (messages.length === 0) {
            return res.status(404).send("User dont have messages");

        } else {
            res.send(messages);
        }
    }).catch((e) => {
        res.status(500).send();
    })
});

module.exports = router;
