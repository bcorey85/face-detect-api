const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const pg = require('pg')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'face-detect'
    }
});

const app = express()
app.use(bodyParser.json())
app.use(cors())

// app.get('/', (req, res) => {
//     res.send(db.users)
// })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)} )

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { image.handleImageDetect(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

const port = process.env.PORT

app.listen(port || 3000, () => {
    console.log(`server started on ${port}`)
})

