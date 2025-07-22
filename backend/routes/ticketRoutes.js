app.post('/api/tickets', async (req, res) => {
  try {
    const { userName, email, title, description, category, priority } = req.body;

    if (!userName || !email || !title || !description || !category || !priority) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Step 1: Create ticket
    const ticket = new Ticket({
      userName,
      email,
      title,
      description,
      category,
      priority
    });

    await ticket.save();

    // Step 2: Find all agents
    const agents = await User.find({ role: 'Agent' });

    // Step 3: Pick a random agent
    if (agents.length > 0) {
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];

      // Step 4: Assign agent to ticket
      ticket.assignee = randomAgent._id;
      await ticket.save();

      // Step 5: Populate and respond
      await ticket.populate('assignee', 'name');
      return res.status(201).json(ticket);
    }

    // No agents found, return ticket without assignment
    res.status(201).json(ticket);
  } catch (err) {
    console.error('Error creating ticket:', err.message);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});
