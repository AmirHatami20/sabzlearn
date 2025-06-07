require("dotenv").config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');

// Import routes
const articleRoutes = require('./routes/article');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const courseRoutes = require('./routes/course');
const commentRoutes = require('./routes/comment');
const sessionRoutes = require('./routes/session');
const offRoutes = require('./routes/off');
const userRoutes = require('./routes/user');

const app = express();

app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use('/uploads', express.static(path.join(__dirname, "/uploads")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/article', articleRoutes);
app.use('/auth', authRoutes);
app.use('/category', categoryRoutes);
app.use('/course', courseRoutes);
app.use('/comment', commentRoutes);
app.use('/session', sessionRoutes);
app.use('/off', offRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
    })
})