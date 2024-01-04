if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}
  
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors')
const params = require('strong-params')
const error = require('./utils/errHandler')
const route = require('./routes')
const task = require('./scheduler')
task.start()
app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(params.expressMiddleware())

app.use('/v1',route)
app.use(error)

app.listen(port, () => {
    console.log(`Running On Port: ${port}`)
})