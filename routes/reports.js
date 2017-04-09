const express = require('express')
const router = express.Router()
const reportRender = require('../services/pdf_reports/')
const path = require('path')
const fs = require('fs')

router.get('/report', (req, res, next) => {
    fs.readFile(path.resolve(__dirname, '../templates/index.html'), 'utf8', (err, data) => {
        if (err) return next(err)
        reportRender(res, data.toString())
    })
})

module.exports = router