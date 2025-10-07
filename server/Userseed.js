import User from './models/User.js';
import bcrypt from 'bcrypt';
import connectToDb from './db/db.js';
import mongoose from 'mongoose'; 

const userRegister = async () => {
  await connectToDb();
  try {
    const hashPassword = await bcrypt.hash('admin', 10);
    const newUser = new User({
      name: 'Admin',
      email: 'Admin@gmail.com',
      password: hashPassword,
      role: 'admin',
    });
    await newUser.save();
    console.log('Admin user created successfully!');
  } catch (error) {
    console.log(error);
  }finally{
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

userRegister();
