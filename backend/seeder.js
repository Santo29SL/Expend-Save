const mongoose = require('mongoose');
const dotenv = require('dotenv');
const InvestmentScheme = require('./models/InvestmentScheme');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

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

const importData = async () => {
    try {
        await connectDB();
        await InvestmentScheme.deleteMany();
        await InvestmentScheme.insertMany(schemes);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
