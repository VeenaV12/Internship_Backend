const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const testRouter = require('./Routers/testRoute')

const session = require('express-session')
const checkRouter = require('./Routers/checkRouter')


async function main(){
    await mongoose.connect(process.env.MONGODB_URL)
}


app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('Uploads'))

main()
.then(console.log('Connected to DB'))
.catch(err=>console.log(err))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


//app.use('/',checkRouter)
app.use('/',testRouter)


const port = process.env.PORT
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})