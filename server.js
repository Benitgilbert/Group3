
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const entryRoutes = require('./routes/entryRoutes');

dotenv.config();

// Initialize the "Express" app (our server).
const app = express();


// 3. MIDDLEWARE (The Gatekeepers)
// 'cors' allows other websites (like your future frontend) to talk to us.
app.use(cors());

// 'express.json' allows us to read JSON data sent in the Body of a request.
// Without this, if a user sends { "email": "..." }, our server would see 'undefined'.
app.use(express.json());

// 4. ROUTES
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/entries', entryRoutes);

// When a request comes to /api/auth, use the authRoutes we defined.
app.use('/api/auth', authRoutes);

// 4. DATABASE CONNECTION
// We try to connect to MongoDB. This is an "asynchronous" operation (it takes time).
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error);
        // If the DB fails, stop the server because we can't do anything without data.
        process.exit(1);
    }
};

// Call the connection function
connectDB();

// 5. BASIC ROUTE (Test if it works)
// If you visit http://localhost:5000/, you should see this message.
app.get('/', (req, res) => {
    res.send('MyDiary API is running...');
});

// 6. START THE SERVER
// Tell the server to listen on the specific port (door).
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});