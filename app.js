const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const authRouter = require('./router/auth');
const userTypeRouter = require('./router/userType');
const freelancerRouter = require('./router/freelancer');
const projectRouter = require('./router/projects');
const proposalRouter = require('./router/proposal');

app.use(express.json());
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS,GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next()
})

app.use((error,req,res,next)=>{
    const data = error.data;
    const message = error.message;
    const status = error.status || 500;
    res.status(status).json({ message: message, data: data });
    next();
})

dotenv.config({path: './config/.env'});

app.use('/auth',authRouter);
app.use('/userType',userTypeRouter);
app.use('/freelancer',freelancerRouter);
app.use('/projects', projectRouter);
app.use('/proposals', proposalRouter);

mongoose.connect(process.env.MONGO_URI).then(result=>{
    app.listen(process.env.PORT, (req,res,next)=>{
        console.log(`Server is Running at PORT ${process.env.PORT}`);
    })
})