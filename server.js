const express=require("express");
const bcrypt=require("bcrypt-nodejs");
const cors=require('cors');
const knex=require('knex');
const register=require('./controllers/register.js')
const signin=require('./controllers/signin.js')
const profile=require('./controllers/profile.js')
const image=require('./controllers/image.js')

const db=knex({
	client: 'pg',
    connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'Steauabucuresti9',
    database : 'smart_brain'
}
})


const app=express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) =>{
     res.send('Succes!')})


app.post('/signin', (req,res)=>{signin.handleSignIn(req, res, db, bcrypt)})

app.post('/register', (req, res)=>{register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req,res)=>{register.handleProfileGet(req, res, db)})

app.put('/image', (req,res)=>{image.handleImage(req,res,db)})





app.listen(3000, ()=>{
	console.log('App is running on port 3000!');
})

