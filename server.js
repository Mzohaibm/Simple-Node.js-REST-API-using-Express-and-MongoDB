const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectionStr = require("./db/db");
const userRouter = require("./Routers/User");

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// userRouter
app.use("/user", userRouter);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
