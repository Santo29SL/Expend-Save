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
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
