// // const express = require('express');
// // const router = express.Router();
// // const User = require('../models/User');

// // // Register User
// // router.post('/register', async (req, res) => {
// //   try {
// //     const newUser = new User(req.body);
// //     await newUser.save();
// //     res.json({ message: 'User registered successfully' });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // module.exports = router;
// // routes/users.js
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// // Get all agents
// router.get('/agents', async (req, res) => {
//   try {
//     const agents = await User.find({ role: 'agent' }, '_id name email');
//     res.json(agents);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // adjust path if needed

// ✅ Route: GET /api/agents — get all agents
router.get('/agents', async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent' }, '_id name email');
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Route: GET /api/assignable — get all assignable users (agents + admins)
router.get('/assignable', async (req, res) => {
  try {
    const assignable = await User.find(
      { role: { $in: ['agent', 'admin'] } },
      '_id name email role'
    );
    res.json(assignable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
