import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import bodyParser from 'body-parser'
import flash from 'express-flash'
import session from 'express-session'
import methodOveride from 'method-override'

import homesRoutes from './routes/homesRoutes.js'
import registerRoutes from './routes/registerRoutes.js'
import loginRoutes from'./routes/loginRoutes.js'

import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {initializePassport} from "./passport-config.js"


const app = express();
const PORT = 5000;

///////// MONGOOSE DB /////////////////////
const uri = process.env.MONGODB_URI
mongoose.set('strictQuery', true)
mongoose.connect(uri, {useUnifiedTopology: true})
// mongoose.connect('mongodb://127.0.0.1/queenshomes', {useUnifiedTopology: true})
// mongoose.connect('mongodb://localhost/queenshomes', {useUnifiedTopology: true})


///////// MIDDLEWARE /////////////////////

app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')))
app.use(methodOveride('_method'))

app.use(flash())
app.use(session({
    secret: 'supersecret', //process.env.SESSION_SECRET
    resave: false,
    saveUninitialized: false
}))
app.use(express.urlencoded({extended: false}))  //allows the access of req.body from route js files

///////// PASSPORT /////////////////////

app.use(passport.initialize())
app.use(passport.session()) 
initializePassport(passport)

//WBS 30:00
//https://www.youtube.com/watch?v=-RCnNyD0L-s&t=1916s&ab_channel=WebDevSimplified

///////// ROUTES /////////////////////

app.get('/', (req,res) => {res.render("index.ejs", {req: req})})
// app.get('/search', (req,res) => {res.render('viewHomes.ejs',{req,req, homes:home})
app.use('/homes',homesRoutes)
app.use('/register',registerRoutes)
app.use('/login', loginRoutes)
app.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

app.listen(process.env.PORT || PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));


// CHANGE DATABASE TO USE MONGO ATLAS
// git add .
// git commit -m " " 
// git push heroku master
//heroku open

