const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Bank', 'Post Office', 'Market']
    },
    type: {
        type: String,
        required: true // e.g., 'FD', 'RD', 'PPF', 'Mutual Fund'
    },
    avgReturnRate: {
        type: Number,
        required: true // Annual return rate percentage
    },
    riskLevel: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High']
    },
    lockInPeriodMonths: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('InvestmentScheme', schemeSchema);
