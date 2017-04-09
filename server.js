// Add monitoring tools
// require('./monitor.js')

const config = require('./config.json')
const express = require('express')
const app = express()
const SERVER_PORT = process.env.PORT || 3000
const routes = require('./routes/index.js')
const routesReports = require('./routes/reports.js')
const morgan = require('morgan')

app.use(morgan('tiny'))
app.use(express.static('public'))
app.use(routes)
app.use(routesReports)

app.listen(SERVER_PORT, () => console.log(`Server up and running on ${SERVER_PORT} port`))
