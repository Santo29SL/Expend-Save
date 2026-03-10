const Goal = require('../models/Goal');

// @desc    Get user goals
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
};

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = async (req, res) => {
    if (!req.body.goalAmount || !req.body.tenureMonths) {
        return res.status(400).json({ message: 'Please provide goalAmount and tenureMonths' });
    }

    const goal = await Goal.create({
        goalAmount: req.body.goalAmount,
        tenureMonths: req.body.tenureMonths,
        user: req.user.id,
    });

    res.status(201).json(goal);
};

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        return res.status(400).json({ message: 'Goal not found' });
    }

    if (goal.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // Creates the targetDate dynamically using pre('save') hook if tenureMonths is updated. Wait, findByIdAndUpdate DOES NOT trigger pre('save'). We should do:
    );

    // To trigger pre('save') middleware, we must use Document.save()
    // Wait, let's fix that.

    if (req.body.goalAmount) goal.goalAmount = req.body.goalAmount;
    if (req.body.tenureMonths) {
        goal.tenureMonths = req.body.tenureMonths;
        // reset target date to trigger recalc
        goal.targetDate = undefined;
    }

    const savedGoal = await goal.save();

    res.status(200).json(savedGoal);
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        return res.status(400).json({ message: 'Goal not found' });
    }

    if (goal.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    await goal.deleteOne();

    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
};
