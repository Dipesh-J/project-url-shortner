const express = require('express');
const mongoose = require('mongoose');
const route = require('./src/routes/route')
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000","http://localhost:5173"]
}))
// Connect to MongoDB
mongoose.set('strictQuery',true)
mongoose.connect('mongodb+srv://group22:1234@group22databse.uvtoalh.mongodb.net/url-shortner', { useNewUrlParser: true })
.then(()=> console.log('Connected to MongoDB'))
.catch((err)=> console.log(err))

app.use('/',route)

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});