const express = require('express')
const app = express();
const port = 5000
const mongodb = require('./DB');
mongodb();
const cors = require('cors');
app.use(cors());
// this is a cors library also called cross origin resource sharing 
// meaning sharing resource from one url to another 
app.use(express.json())
// app.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.url}`);
//   next(); // Call the next middleware or route handler
// });
// this is only used to parse incoming json files 
// that means only for requests, so if i dont use it while sending response it is fine
app.use('/api',require("./Routes/createUser"));
app.use('/api',require("./Routes/loginuser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require('./Routes/DisplayOrders'));
// this mounts the route and creates it 
// meaning it is /api/loginuser is the route
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// now