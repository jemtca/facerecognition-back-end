
const express = require("express");
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// heroku
const PORT = process.env.PORT || 3000;

const db = knex({
  client: 'pg',
  // localhost
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'facerecognition'
  }
  // heroku
  // connection : {
  //   connectionString: process.env.DATABASE_URL,
  //   ssl: {
  //     rejectUnauthorized: false
  //   }
  // }
});

const app = express();

// middleware to parse json
app.use(express.json());

// middleware to enable cors
app.use(cors());

// heroku
app.get('/', (req, res) => res.send('it\'s working!'));

// sending email and password within the body
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));

// sending the name, email and password within the body
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));

// localhost:3000/profile/1
app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db));

// sending the id within the body
app.put('/image', (req, res) => image.handleImage(req, res, db));

// sending the input within the body
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));

/*

	'/': res --> users
	'/signin': POST --> success/fail
	'/register': POST --> user
	'/profile/userId': GET --> user
	'/image': PUT --> user

*/
