const { Groq } = require('groq-sdk');

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// @desc    Get AI investment suggestion
// @route   POST /api/ai/suggest
// @access  Private
const getAiSuggestion = async (req, res) => {
    const { goalAmount, tenureMonths, riskPreference, salary } = req.body;

    if (!goalAmount || !tenureMonths || !riskPreference || !salary) {
        return res.status(400).json({ message: 'Please provide goalAmount, tenureMonths, riskPreference, and salary' });
    }

    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
        return res.status(500).json({ message: 'Groq API key is missing or invalid in .env file' });
    }

    try {
        const prompt = `You are an expert Indian financial advisor. A user wants to save for a goal of ₹${goalAmount} over a period of ${tenureMonths} months. Their monthly salary is ₹${salary} and their risk preference is ${riskPreference}. 
    
    Recommend the single best investment scheme from this list: Savings Account (SB), Fixed Deposit (FD), Recurring Deposit (RD), Public Provident Fund (PPF), National Savings Certificate (NSC), 5-Year Time Deposit (5TD), Senior Citizen Savings Scheme (SCSS), Sukanya Samriddhi Yojana (SSY), Equity Mutual Fund, Debt Mutual Fund, or Bluechip Stocks.
    If you recommend 'Equity Mutual Fund' or 'Bluechip Stocks', you MUST specify which market cap size (Large Cap, Mid Cap, or Small Cap) based on the risk level chosen by the user.
    
    Return your response strictly in JSON format like this:
    {
       "suggestion": "string (the exact name of the scheme)",
       "reasoning": "string (2-3 sentences explaining why this is the best choice and roughly how much they should save per month)",
       "marketCap": "string (Large Cap, Mid Cap, Small Cap, or None if not applicable)"
    }`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            model: 'meta-llama/llama-4-scout-17b-16e-instruct', // Fast, free tier reliable model
            temperature: 0.5,
            response_format: { type: 'json_object' }
        });

        const aiResponse = JSON.parse(chatCompletion.choices[0]?.message?.content);

        res.status(200).json({
            suggestion: aiResponse.suggestion,
            reasoning: aiResponse.reasoning
        });

    } catch (error) {
        console.error('Groq AI Error:', error);
        res.status(500).json({ message: 'Error fetching AI suggestion', error: error.message });
    }
};

module.exports = {
    getAiSuggestion
};
