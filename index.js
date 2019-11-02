const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// importing routes
const authRoutes = require('./modules/authModule/routes/authRoutes');
const testRoutes = require('./modules/testModule/routes/testroutes');

// Adding dotenv
dotenv.config();

// connect to the db
mongoose.connect(process.env.DB_LINK,{ useUnifiedTopology: true,useNewUrlParser: true }, () => {
    console.log('connected to the db');
});


// parsing request plugin
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Adding routes to the app
app.use('/api/v1',authRoutes);

// test routes
app.use('/api/v1',testRoutes);

port =  process.env.PORT | 3000;
app.listen(port,() => console.log(`running on port ${port}`));




/*
mongodb+srv://anas:<password>@testcluster-fxaqi.mongodb.net/test?retryWrites=true&w=majority

*/