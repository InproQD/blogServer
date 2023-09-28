const express = require('express')

const app =  express()

const router = require("./router")
const bodyParser = require('body-parser')

// 允许跨域请求的配置
app.use(require("cors")())

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use('/api', router)

app.listen('8083', () => {
})





