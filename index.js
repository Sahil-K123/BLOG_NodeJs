const express = require('express')
const PORT = process.env.PORT || 3000;
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middleware/auth');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const Blog = require('./models/blog');



const app = express(); //express instance


const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);

// mongoose.connect(`mongodb+srv://sahilkarwani0213:dC0v4otDtrmxPyYw@cluster0.sb09v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.sb09v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(e => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));
// pY2Se1egKYUcYtaS
// 

app.set('view engine', 'ejs')
app.set('views', path.resolve("./views"));

 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render('home', {
        user: req.user,
        blogs: allBlogs,
    })
})

app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on the port: ${PORT}`)
})