const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/helpdesk', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection failed:', err));

// Schemas & Models
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'User' },
  date: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

const TicketSchema = new mongoose.Schema({
  userName: String,
  email: String,
  title: String,
  description: String,
  status: { type: String, default: 'Open' },
  priority: String,
  category: String,
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
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

// ROUTES

// Register User
app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Ticket
app.post('/api/tickets', async (req, res) => {
  try {
    const { userName, email, title, description, category, priority } = req.body;
    if (!userName || !email || !title || !description || !category || !priority) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const ticket = new Ticket({ userName, email, title, description, category, priority });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// Get All Tickets
app.get('/api/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ date: -1 }).populate('assignee', 'name');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Tickets Assigned to Agent
app.get('/api/tickets/agent/:agentId', async (req, res) => {
  try {
    const agentId = req.params.agentId;
    const tickets = await Ticket.find({ assignee: agentId }).sort({ date: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Ticket
app.put('/api/tickets/update/:id', async (req, res) => {
  try {
    const updated = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('assignee', 'name');
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Assign Ticket to Agent
app.post('/api/tickets/assign', async (req, res) => {
  const { ticketId, agentId } = req.body;
  try {
    const agent = await User.findById(agentId);
    if (!agent || !['Agent', 'Admin'].includes(agent.role)) {
      return res.status(400).json({ error: 'Invalid agent ID or role' });
    }

    const updated = await Ticket.findByIdAndUpdate(
      ticketId,
      { assignee: agent._id },
      { new: true }
    ).populate('assignee', 'name');

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Agents
app.get('/api/users/agents', async (req, res) => {
  try {
    const agents = await User.find({ role: 'Agent' });
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Assignable Users (Agents + Admins)
app.get('/api/users/assignable', async (req, res) => {
  try {
    const assignable = await User.find(
      { role: { $in: ['Agent', 'Admin'] } },
      '_id name email role'
    );
    res.json(assignable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Comments
app.get('/api/comments/:ticketId', async (req, res) => {
  try {
    const comments = await Comment.find({ ticketId: req.params.ticketId }).sort({ createdAt: 1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/comments', async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Feedback
app.get('/api/feedback/:ticketId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ ticketId: req.params.ticketId }).sort({ createdAt: 1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Stubbed login and user endpoints
app.post('/api/users/login', async (req, res) => {
  res.status(501).send("Login endpoint not implemented yet");
});

app.get('/api/users', async (req, res) => {
  res.status(501).send("Get users endpoint not implemented yet");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
