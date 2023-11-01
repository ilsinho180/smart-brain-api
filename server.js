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
    host : process.env.DATABASE_URL,
    ssl:true,
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





app.listen(process.env.PORT || 3000, ()=>{
	console.log(`App is running on port ${process.env.PORT}!`);
})

