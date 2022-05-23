const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const port = 50;
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/contact');
}
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
});

app.use('/static', express.static('static'));
app.use(express.urlencoded())
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))


var contact = mongoose.model('contact', contactSchema);

app.get('/', (req, res) => {
    res.status(200).render('home.pug');
})
app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
})
app.get('/about', (req, res) => {
    res.status(200).render('about.pug');
})
app.get('/faq', (req, res) => {
    res.status(200).render('faq.pug');
})
app.post('/contact', (req, res) => {
    var mydata = new contact(req.body);
    mydata.save().then(() => {
        res.render('contact.pug')
    }).catch(() => {
        res.send(`<h1>This item has not been send</h1>`)
    })
})

app.listen(port, () => {
    console.log(`This site is served at port ${port}`);
})