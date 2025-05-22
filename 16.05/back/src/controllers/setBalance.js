import User from '../models/User.js'

const setBalance = async (req, res) => {
  try {
    const { email, amount } = req.body;

    if (!email || typeof amount !== 'number') {
      return res.status(400).json({ error: 'Email and numeric amount are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newBalance = user.currentBalance + amount;

    if (newBalance < 0) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }

    user.currentBalance = newBalance;

    user.transactions.push({
      type: amount >= 0 ? 'income' : 'expense',
      amount: Math.abs(amount),
    });

    await user.save();

    res.status(200).json({
      message: 'Balance updated successfully',
      balance: user.currentBalance,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const allUsers = await User.find({}, 'email transactions');
    const transactions = [];

    allUsers.forEach(user => {
      user.transactions.forEach(tx => {
        transactions.push({
          email: user.email,
          type: tx.type,
          amount: tx.amount,
          date: tx.date,
          _id: tx._id, // для удаления
        });
      });
    });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ 'transactions._id': id });

    if (!user) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    user.transactions = user.transactions.filter(tx => tx._id.toString() !== id);

    user.currentBalance = user.transactions.reduce((sum, tx) =>
      tx.type === 'income' ? sum + tx.amount : sum - tx.amount,
    0);

    await user.save();

    res.status(200).json({ message: 'Transaction deleted and balance updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { setBalance, getTransactions, deleteTransaction };



