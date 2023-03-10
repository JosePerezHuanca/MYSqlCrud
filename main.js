const express=require('express');
const app=express();
const indexRoute=require('./routes/index')
const userRoute=require('./routes/usersRoute');
const tasksRoute=require('./routes/tasksRoute')
const morgan=require('morgan');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));
app.use('/', indexRoute);
app.use('/users', userRoute);
app.use('/tasks', tasksRoute);
app.use((req,res,next)=>{
    res.status(404).send('El recurso no existe');
});

const port=8080;
app.listen(port);
console.log('ok');
