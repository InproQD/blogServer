const express = require('express')

const app =  express()

const router = require("./router")

app.use(require("cors")())

app.use('/api', router)

app.listen('8083', () => {
})





