const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Clean up legacy email_1 unique index if it exists
        try {
            await conn.connection.db.collection('users').dropIndex('email_1');
            console.log('Dropped legacy unique email_1 index.');
        } catch (indexError) {
            // Index might not exist, which is fine and will be caught here
        }

        // Auto-seed schemes if none exist
        try {
            const InvestmentScheme = require('../models/InvestmentScheme');
            const count = await InvestmentScheme.countDocuments();
            if (count === 0) {
                const schemes = [
                    { name: 'Savings Account (SB)', category: 'Bank', type: 'SB', avgReturnRate: 3.5, riskLevel: 'Low', lockInPeriodMonths: 0 },
                    { name: 'Fixed Deposit (FD)', category: 'Bank', type: 'FD', avgReturnRate: 7.0, riskLevel: 'Low', lockInPeriodMonths: 12 },
                    { name: 'Recurring Deposit (RD)', category: 'Bank', type: 'RD', avgReturnRate: 6.5, riskLevel: 'Low', lockInPeriodMonths: 6 },
                    { name: 'Public Provident Fund (PPF)', category: 'Post Office', type: 'PPF', avgReturnRate: 7.1, riskLevel: 'Low', lockInPeriodMonths: 180 },
                    { name: 'National Savings Certificate (NSC)', category: 'Post Office', type: 'NSC', avgReturnRate: 7.7, riskLevel: 'Low', lockInPeriodMonths: 60 },
                    { name: '5-Year Time Deposit (5TD)', category: 'Post Office', type: '5TD', avgReturnRate: 7.5, riskLevel: 'Low', lockInPeriodMonths: 60 },
                    { name: 'Senior Citizen Savings Scheme (SCSS)', category: 'Post Office', type: 'SCSS', avgReturnRate: 8.2, riskLevel: 'Low', lockInPeriodMonths: 60 },
                    { name: 'Sukanya Samriddhi Yojana (SSY)', category: 'Post Office', type: 'SSY', avgReturnRate: 8.2, riskLevel: 'Low', lockInPeriodMonths: 252 },
                    { name: 'Equity Mutual Fund', category: 'Market', type: 'Mutual Fund', avgReturnRate: 12.0, riskLevel: 'High', lockInPeriodMonths: 0 },
                    { name: 'Debt Mutual Fund', category: 'Market', type: 'Mutual Fund', avgReturnRate: 8.0, riskLevel: 'Medium', lockInPeriodMonths: 0 },
                    { name: 'Bluechip Stocks', category: 'Market', type: 'Stocks', avgReturnRate: 15.0, riskLevel: 'High', lockInPeriodMonths: 0 }
                ];
                await InvestmentScheme.insertMany(schemes);
                console.log('Database auto-seeded with default investment schemes.');
            }
        } catch (seedError) {
            console.error('Error seeding schemes:', seedError.message);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
