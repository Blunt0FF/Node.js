import express from 'express';
import connectDb from './db/config.js';
import Group from './models/Group.js';
import User from './models/User.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: 'Home page' });
});

// === GROUP ROUTES ===

// Create group
app.post('/groups', async (req, res) => {
  try {
    const { name, members } = req.body;
    const group = new Group({ name, members });
    await group.save();
    res.status(201).json({ message: 'Group created', group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create group' });
  }
});

// Get all groups
app.get('/groups', async (req, res) => {
  try {
    const groups = await Group.find().populate('members');
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
});

// Get one group by ID
app.get('/groups/:id', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('members');
    if (!group) return res.status(404).json({ error: 'Group not found' });
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch group' });
  }
});

// Update group
app.put('/groups/:id', async (req, res) => {
  try {
    const updated = await Group.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Group not found' });
    res.status(200).json({ message: 'Group updated', group: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update group' });
  }
});

// Delete group
app.delete('/groups/:id', async (req, res) => {
  try {
    const deleted = await Group.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Group not found' });
    res.status(200).json({ message: 'Group deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete group' });
  }
});

// === USER ROUTES ===

app.post('/users', async (req, res) => {
  try {
    const { name, email, password, groups } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    const newUser = new User({ name, email, password, groups: groups || [] });
    await newUser.save();

    if (groups && groups.length > 0) {
      await Group.updateMany(
        { _id: { $in: groups } },
        { $addToSet: { members: newUser._id } }
      );
    }

    res.status(201).json({
      message: 'User was created',
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Delete user
app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

app.listen(PORT, async () => {
  try {
    await connectDb();
    console.log(`Server is listening on port: ${PORT}`);
  } catch (error) {
    console.log("Server doesn't work");
  }
});