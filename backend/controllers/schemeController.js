const InvestmentScheme = require('../models/InvestmentScheme');

// @desc    Get all investment schemes
// @route   GET /api/schemes
// @access  Public
const getSchemes = async (req, res) => {
    const schemes = await InvestmentScheme.find({});
    res.status(200).json(schemes);
};

// @desc    Calculate returns based on goal, tenure, and scheme
// @route   POST /api/schemes/calculate
// @access  Public
const calculateReturns = async (req, res) => {
    const { goalAmount, tenureMonths, schemeId } = req.body;

    if (!goalAmount || !tenureMonths || !schemeId) {
        return res.status(400).json({ message: 'Please provide goalAmount, tenureMonths and schemeId' });
    }

    const scheme = await InvestmentScheme.findById(schemeId);

    if (!scheme) {
        return res.status(404).json({ message: 'Scheme not found' });
    }

    // Simple compound interest calculation for monthly savings required
    // using formula: A = P[((1+r)^n - 1)/r] * (1+r) for recurring deposits (approximate for SIP)
    // Let's use a standard SIP formula: M = P * ({[1 + i]^n - 1} / i) * (1 + i)
    // We need to find P (monthly investment)

    const annualRate = scheme.avgReturnRate / 100;
    const monthlyRate = annualRate / 12;
    const n = tenureMonths;

    let monthlyInvestment = 0;
    let totalInvestment = 0;
    let estimatedReturns = 0;

    if (monthlyRate === 0) {
        monthlyInvestment = goalAmount / n;
    } else {
        // Correct SIP backward formula
        // P = M / ( ( ( (1 + i)^n ) - 1 ) / i ) * (1 + i) )
        const numerator = goalAmount;
        const denominator = ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) * (1 + monthlyRate);
        monthlyInvestment = numerator / denominator;
    }

    totalInvestment = monthlyInvestment * n;
    estimatedReturns = goalAmount - totalInvestment;

    res.status(200).json({
        schemeName: scheme.name,
        riskLevel: scheme.riskLevel,
        avgReturnRate: scheme.avgReturnRate,
        monthlyInvestmentRequired: Math.round(monthlyInvestment),
        totalInvestment: Math.round(totalInvestment),
        estimatedReturns: Math.round(estimatedReturns),
        targetAmount: goalAmount,
        tenureMonths: n
    });
};

module.exports = {
    getSchemes,
    calculateReturns
};
