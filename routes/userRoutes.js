const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({
      message: 'User Created Successfully',
      user: newUser,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (deletedUser) {
      res.json(deletedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
