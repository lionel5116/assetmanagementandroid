const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();

//Connect to Database
connectDB();

app.use(express.json({extended:false}));

app.use(cors({
  origin: '*',
  methods:['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.get('/',(req,res) => res.send('API SERVICE IS RUNNING ON ANDROID'));


//http://localhost:5000/api/asset
app.use('/api/asset', require('./routes/api/asset'));

const  PORT = process.env.PORT || 5500;

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));


