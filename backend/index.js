import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/user.js';

const app = express();
const PORT = process.env.PORT || 3001;
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'vueDB',
});

app.use(cors(corsOptions));
app.use(express.json());

// Hello World Test-Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Register Route
app.post('/users', async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
    console.log('Received POST request at /users');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login Route
app.post('/users/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: 'Email not found' });
    }

    const enteredPassword = req.body.password;
    const isPasswordValid = await bcrypt.compare(
      enteredPassword,
      user.password
    );

    console.log('User entered password:', req.body.password);
    console.log('Database password:', user.password);
    console.log('isPasswordValid:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Get logged in user
app.get('/users', async (req, res) => {
  try {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
      return res
        .status(401)
        .json({ error: 'Unauthorized - Token not provided' });
    }
    const token = tokenHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized - User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
