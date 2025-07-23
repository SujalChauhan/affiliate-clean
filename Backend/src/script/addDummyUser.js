// ...existing code...
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Users = require('../model/Users');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/affiliate';

async function addDummyUser() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const hashedPassword = await bcrypt.hash('dummy123', 10);

  const user = new Users({
    email: 'dummy@example.com',
    password: hashedPassword,
    name: 'DummyUser',
    role: 'admin',
  });

  await user.save();
  console.log('Dummy user added:', user);

  await mongoose.disconnect();
}

addDummyUser().catch(console.error);
// ...existing code...