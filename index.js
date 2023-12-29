const express = require('express')
const PORT = process.env.PORT || 3000;
const path = require('path');
const userRoute = require('./routes/user');
const  mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middleware/auth');


const app = express();

mongoose.connect("mongodb://localhost:27017/blogify").then(e => console.log('MongoDB Connected'))


app.set('view engine', 'ejs')
app.set('views', path.resolve("./views"));


app.use(express.urlencoded({ extended: false }))
app.use('/user', userRoute)
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))

app.get('/', (req, res) => {
    res.render('home', {
        user: req.user
    })
})


app.listen(PORT, () => {
    console.log(`Server is listening on the port: ${PORT}`)
})