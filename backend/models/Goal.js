const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    goalAmount: {
        type: Number,
        required: true
    },
    tenureMonths: {
        type: Number,
        required: true
    },
    targetDate: {
        type: Date
    }
}, { timestamps: true });

// Auto-calculate target date based on tenure if not provided
goalSchema.pre('save', function (next) {
    if (this.isModified('tenureMonths') && !this.targetDate) {
        const date = new Date();
        date.setMonth(date.getMonth() + this.tenureMonths);
        this.targetDate = date;
    }
    next();
});

module.exports = mongoose.model('Goal', goalSchema);
