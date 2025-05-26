const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

app.use("/api/auth", require("./routes/auth"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));