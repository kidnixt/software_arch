const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/users', (req, res) => {
  User.find({}).then((users) => {
    res.send(users);
  }).catch((e) => {
    res.status(500).send();
  })
});

router.get('/users/:id', (req, res) => {
  const id = req.params.id;

  User.findById(id).then((user) => {
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  }).catch((e) => {
    res.status(500).send();
  })
});

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'age', 'email']; // campos permitidos para actualizar
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({ error: 'Invalid update' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }

    updates.forEach((update) => user[update] = req.body[update]);
    await user.save();

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});


router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;