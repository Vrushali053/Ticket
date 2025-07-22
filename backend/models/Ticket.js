const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, required: true },
  status: {
    type: String,
    enum: ['Open', 'New', 'Assigned', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open'
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
app.post('/api/tickets', async (req, res) => {
  try {
    console.log('Ticket Payload:', req.body);  // 👈 Add this line
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    console.error('Error creating ticket:', err);  // 👈 Add this line
    res.status(400).json({ error: err.message });
  }
});
