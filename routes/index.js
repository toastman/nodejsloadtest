const express = require('express')
const mongoConnected = require('../db.js')
const path = require('path')

const router = express.Router()

router.get('/people', (req, res) => {
    mongoConnected.then(db => {
        db
            .collection('people').find({})
            .toArray((err, users) => {
                res.send(users)
            })
    })
})

const asyncFunc = () => new Promise((res, rej) => {
    setTimeout(() => res('Now async/await works in node from v 7.x'), 2000)
})

const handleCall = async () => await asyncFunc()

router.get('/async', (req, res) => {
    handleCall()
        .then(d => res.send(d))
        .catch(err => res.status(400).send(err))
})

router.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')))


module.exports = router