// const express = require('express');
// const router = express.Router();
// const Ticket = require('../models/Ticket');

// // POST a new ticket (User/Client)
// router.post('/', async (req, res) => {
//   try {
//     const { userName, email, title, description, category, priority } = req.body;

//     const newTicket = new Ticket({
//       userName,
//       email,
//       title,
//       description,
//       category,
//       priority,
//       status: 'Open' // default status
//     });

//     await newTicket.save();
//     res.status(201).json(newTicket);
//   } catch (err) {
//     console.error('Error creating ticket:', err.message);
//     res.status(400).json({ error: err.message });
//   }
// });

// // GET all tickets (Admin)
// router.get('/', async (req, res) => {
//   try {
//     const tickets = await Ticket.find()
//       .populate('assignedTo', 'name email')
//       .sort({ createdAt: -1 });

//     res.json(tickets);
//   } catch (err) {
//     console.error('Error fetching tickets:', err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// // PUT - Assign ticket (Admin)
// router.put('/assign/:id', async (req, res) => {
//   try {
//     const { agentId } = req.body;

//     const updatedTicket = await Ticket.findByIdAndUpdate(
//       req.params.id,
//       {
//         assignedTo: agentId,
//         status: 'Assigned'
//       },
//       { new: true }
//     ).populate('assignedTo', 'name email');

//     res.json(updatedTicket);
//   } catch (err) {
//     console.error('Error assigning ticket:', err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// // GET - Tickets assigned to a specific agent
// router.get('/agent/:agentId', async (req, res) => {
//   try {
//     const tickets = await Ticket.find({ assignedTo: req.params.agentId })
//       .sort({ createdAt: -1 });

//     res.json(tickets);
//   } catch (err) {
//     console.error('Error fetching agent tickets:', err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;
