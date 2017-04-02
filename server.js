const config = require('./config.json')
const metrics = require('datadog-metrics')

metrics.init({
    host: config.datadog_host,
    prefix: config.datadog_host.datadog_app_prefix,
    apiKey: config.datadog_api_key
})

function collectMemoryStats() {
    var memUsage = process.memoryUsage();
    metrics.gauge('memory.rss', memUsage.rss);
    metrics.gauge('memory.heapTotal', memUsage.heapTotal);
    metrics.gauge('memory.heapUsed', memUsage.heapUsed);
}

setInterval(collectMemoryStats, 5000)

// const StatsD = require('node-dogstatsd').StatsD
// const dogstatsd = new StatsD()
// dogstatsd.increment('page.views')

const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const SERVER_PORT = process.env.PORT || 3000


const mongoConnected = new Promise((res, rej) => {
    MongoClient.connect(config.mongodb_url, (err, db) => {
        if (err) rej(err)
        console.log('Connected correctly to server')
        res(db)
    })
})

mongoConnected.catch(err => console.error(err.stack))

app.use(express.static('public'))
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
