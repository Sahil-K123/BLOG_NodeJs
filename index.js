const express = require('express')
const PORT = process.env.PORT || 3000;
const path = require('path');
const userRoute = require('./routes/user');
const  mongoose = require('mongoose');


const app = express();

mongoose.connect("mongodb://localhost:27017/blogify").then(e => console.log('MongoDB Connected'))


app.set('view engine', 'ejs')
app.set('views', path.resolve("./views"));


app.get('/', (req, res) => {
    res.render('home')
})

app.use('/user', userRoute)


app.listen(PORT, () => {
    console.log(`Server is listening on the port: ${PORT}`)
})