const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();
const blogsRouter = require('./controller/blogs');
const config = require('./utils/config');

let mongoUrl = config.MONGODB_URI;


mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);
module.exports = app;