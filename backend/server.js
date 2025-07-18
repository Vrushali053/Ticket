const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/helpdesk', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection failed:', err));

// ========== Models ==========

const TicketSchema = new mongoose.Schema({
  userName: String,
  email: String,
  title: String,
  description: String,
  status: { type: String, default: 'Open' },
  priority: String,
  category: String,
  assignee: String,
  date: { type: Date, default: Date.now }
});
const Ticket = mongoose.model('Ticket', TicketSchema);

const CommentSchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  author: String,
  body: String,
  isInternalNote: Boolean,
  createdAt: { type: Date, default: Date.now }
});
const Comment = mongoose.model('Comment', CommentSchema);

const FeedbackSchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now }
});
const Feedback = mongoose.model('Feedback', FeedbackSchema);

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'User' },
  date: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

// ========== Routes ==========

// Create Ticket
app.post('/api/tickets', async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Tickets
app.get('/api/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ date: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Ticket
app.put('/api/tickets/update/:id', async (req, res) => {
  try {
    const updated = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Comments endpoints
app.get('/api/comments/:ticketId', async (req, res) => {
  try {
    const com = await Comment.find({ ticketId: req.params.ticketId }).sort({ createdAt: 1 });
    res.json(com);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/comments', async (req, res) => {
  try {
    const c = new Comment(req.body);
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Feedback endpoints
app.get('/api/feedback/:ticketId', async (req, res) => {
  try {
    const fb = await Feedback.find({ ticketId: req.params.ticketId }).sort({ createdAt: 1 });
    res.json(fb);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/feedback', async (req, res) => {
  try {
    const f = new Feedback(req.body);
    await f.save();
    res.status(201).json(f);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User Registration
app.post('/api/users/register', async (req, res) => {
  // ... same as before
});

// User Login
app.post('/api/users/login', async (req, res) => {
  // ... same as before
});

// (Optional) Get All Users
app.get('/api/users', async (req, res) => {
  // ... same as before
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
