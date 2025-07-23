const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("./src/routes/authRoutes");
const linksRoutes = require("./src/routes/linksRoutes");
const userRoutes = require("./src/routes/userRoutes");
const mongoose = require("mongoose");
//middlewares
app.use(express.json()); //it is used to parse JSON bodies
app.use(cookieParser());
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=> console.log("MongoDB connected successfully"));



app.use(cors());


app.use('/auth' , authRoutes );
app.use('/links' , linksRoutes);
app.use('/users' , userRoutes);

const port = process.env.PORT || 6001;
app.listen(port, (err) => {
  if (err) {
    console.log("server not started : ", err);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});

// const path = require('path');
// app.use(express.static(path.join(__dirname, 'dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });
 