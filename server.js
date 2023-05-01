const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport')
const auth = require('./auth');
const User = require('./database');
const mongoose = require('mongoose');
const {initializingPassport, isAuthenticated}=require('./pConfig')

initializingPassport(passport);

mongoose.connect('mongodb+srv://mushroom:monitor@mushroom.toqpt0l.mongodb.net/Users', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Successfully connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


const app = express();
app.use(session({ secret: 'cats' }))

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

app.set("view engine", "ejs");

const views = `${__dirname}/views`
const resources = `${__dirname}/resources`
const web = `${__dirname}/web`

app.use(express.static(views));
app.use(express.static(resources));
app.use(express.static(web));

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/auth/failure' }));

app.get('/auth/failure', (req, res) => {
    res.send("Something went wrong....!<a href=" / ">GO back to login page</a> ");
})

app.get('/login', (req, res) => {
    res.render("login");
})

app.get('/register', (req, res) => {
    res.render("register");
})

app.get('/add',isAuthenticated, (req, res) => {
    res.sendFile(`${web}/adddevice.html`);
})

app.get('/', (req, res) => {
    res.sendFile(`${web}/welcome.html`)
})

app.get('/charts',isAuthenticated, (req, res) => {
    res.sendFile(`${web}/charts.html`)
})

app.get('/team',isAuthenticated,(req,res)=>{
    res.sendFile(`${web}/team.html`);
})

app.post('/login', passport.authenticate('local', {
    failureRedirect: '/register',
    failureFlash: true
  }), function(req, res) {
    // Redirect to homepage on success
    res.redirect('/');
  });

app.post('/register', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (user) return res.status(400).send("user already exist! ");

        const newUser = await User.create(req.body);
        res.redirect('/');
    } catch (error) {   
        console.log(error)
    }
})

app.get('/*',(req,res)=>{
    res.sendFile(`${web}/404.html`)
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});