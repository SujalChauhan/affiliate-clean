const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const Users = require('../model/Users');

async function addTestUser() {
  const email = 'test@example.com';
  const password = 'admin123'; // Plain password for login
  const name = 'Test User';

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const existing = await Users.findOne({ email });
    if (existing) {
      console.log('User already exists:', email);
      process.exit(0);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Users({ email, password: hashedPassword, name });
    await user.save();
    console.log('Test user created:', email, 'Password:', password);
    process.exit(0);
  } catch (err) {
    console.error('Error creating test user:', err);
    process.exit(1);
  }
}

addTestUser();