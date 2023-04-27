const express = require('express');
const bodyParser  = require('body-parser');
const session = require('express-session');
const passport = require('passport')
const auth = require('./auth');

const app = express();
app.use(session({secret:'cats'}))
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const port = 3000;

const views = `${__dirname}/views`
const resources = `${__dirname}/resources`
const web = `${__dirname}/web`

app.use(express.static(views));
app.use(express.static(resources));
app.use(express.static(web));



function isLoggedIn(req,res,next){
    req.user ? next():res.sendStatus(401);
}

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/auth/google',passport.authenticate('google',{scope:['email','profile']}));

app.get('/google/callback',passport.authenticate('google',{successRedirect:'/',failureRedirect:'/auth/failure'}));

app.get('/auth/failure',(req,res)=>{
    res.send("Something went wrong....!<a href="/">GO back to login page</a> ");
})

app.get('/login',(req,res)=>{
    res.sendFile(`${views}/login.html`);
})

app.get('/',(req,res)=>{
    res.sendFile(`${views}/welcome.html`) 
})

app.get('/protected2',isLoggedIn,(req,res)=>{
    res.send("protected")  
})

app.get('/chart',(req,res)=>{
    res.sendFile(`${views}/charts.html`)  
})

app.get('/nww',(req,res)=>{
    res.sendFile(`${views}/nww.html`)
})




app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
});