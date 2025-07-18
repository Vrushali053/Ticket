const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// POST a new ticket
router.post('/', async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
