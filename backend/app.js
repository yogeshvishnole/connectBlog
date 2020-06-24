const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const blogRouter = require('./routes/blogRouter');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const tagRouter = require('./routes/tagRouter');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes middlewares
app.use('/api', blogRouter);

app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', categoryRouter);
app.use('/api', tagRouter);

module.exports = app;
