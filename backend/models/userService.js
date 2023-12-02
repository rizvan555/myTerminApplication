import mongoose from 'mongoose';

const userServiceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  
  selectedService: {
    type: String,
    required: true,
  },
});

const UserService = mongoose.model('UserService', userServiceSchema);

export default UserService;
