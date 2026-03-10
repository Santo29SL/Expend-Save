const Transaction = require('../models/Transaction');

// @desc    Get transactions
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(transactions);
};

// @desc    Set transaction
// @route   POST /api/transactions
// @access  Private
const setTransaction = async (req, res) => {
    if (!req.body.description || !req.body.amount || !req.body.category || !req.body.type) {
        return res.status(400).json({ message: 'Please add all required fields' });
    }

    const transaction = await Transaction.create({
        description: req.body.description,
        amount: req.body.amount,
        type: req.body.type,
        category: req.body.category,
        date: req.body.date || Date.now(),
        user: req.user.id,
    });

    res.status(201).json(transaction);
};

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        return res.status(400).json({ message: 'Transaction not found' });
    }

    // Check for user
    if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the transaction user
    if (transaction.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedTransaction);
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        return res.status(400).json({ message: 'Transaction not found' });
    }

    // Check for user
    if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the transaction user
    if (transaction.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    await transaction.deleteOne();

    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getTransactions,
    setTransaction,
    updateTransaction,
    deleteTransaction,
};
