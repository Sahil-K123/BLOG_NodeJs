const express = require('express')
const PORT = process.env.PORT || 3000;
const path = require('path');
const  mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middleware/auth');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const Blog = require('./models/blog');


const app = express();

mongoose.connect("mongodb://localhost:27017/blogify").then(e => console.log('MongoDB Connected'))


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