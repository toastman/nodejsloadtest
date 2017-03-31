const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const SERVER_PORT = process.env.PORT || 3000
const config = require('./config.json')

const mongoConnected = new Promise((res, rej) => {
    MongoClient.connect(config.mongodb_url, (err, db) => {
        if (err) rej(err)
        console.log('Connected correctly to server')
        res(db)
    })
})

mongoConnected.catch(err => console.error(err.stack))

// app.use(express.static('public'))
app.get('/people', (req, res) => {
    mongoConnected.then(db => {
        db
            .collection('people').find({})
            .toArray((err, users) => {
                res.send(users)
            })
    })
})

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.listen(SERVER_PORT, () => console.log(`Server up and running on ${SERVER_PORT} port`))
