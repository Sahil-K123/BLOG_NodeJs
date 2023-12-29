const express = require('express')
const PORT = process.env.PORT || 3000;
const path = require('path')

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.resolve("./views"));


app.get('/', (req, res) => {
    res.render('home')
})



app.listen(PORT, () => {
    console.log(`Server is listening on the port: ${PORT}`)
})