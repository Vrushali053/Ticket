const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection URI from environment variable (optional, for production)
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/helpdesk';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection failed:', err));

// ✅ Root route for Render to check service is running
app.get('/', (req, res) => {
  res.send('🚀 Helpdesk backend is running');
});

// (Your schema and route definitions remain unchanged...)
// --- all your User, Ticket, Comment, Feedback schemas and APIs go here ---

// ✅ Start server using Render-assigned port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
