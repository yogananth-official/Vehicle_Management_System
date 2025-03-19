const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const VehicleRequest = require('./models/VehicleRequest');
const VehicleStatus = require('./models/VehicleStatus');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const MONGO_URI = "mongodb://127.0.0.1:27017/VMS";

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// API to submit a vehicle request
app.post('/submit-request', async (req, res) => {
    try {
        const { userId, vehicleType, purpose, startDate, endDate, comments } = req.body;

        if (!userId || !vehicleType || !purpose || !startDate || !endDate) {
            return res.status(400).json({ error: "Missing required fields: userId, vehicleType, purpose, startDate, endDate" });
        }

        const request = new VehicleRequest({
            userId,
            vehicleType,
            purpose,
            startDate,
            endDate,
            comments,
            status: "Pending"
        });

        await request.save();
        res.status(201).json({ message: "Request submitted successfully!" });
    } catch (error) {
        console.error("Error in /submit-request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
