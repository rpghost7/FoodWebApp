const express = require('express')
const app = express();
const port = 5000
const mongodb = require('./DB');

mongodb();
app.use(express.json())
// this is only used to parse incoming json files 
// that means only for requests, so if i dont use it while sending response it is fine
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api',require("./Routes/createUser"));

// this mounts the route and creates it 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// now