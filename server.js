const express = require("express");
const app = express();
const cors = require("cors");
const apiRoutes = require("./api");
var ws = new WebSocket('wss://fullstackbadbank-b6da6885c918.herokuapp.com/');   

   ws.onopen = function()    
       {

          // Web Socket is connected, send data using send()
          var data={
            mid:"login",
            uid: myId

          };
               ws.send(JSON.stringify(data));      

            };  

app.use(express.static("public"));
app.use(cors());
app.use(express.json()); // Add this line to parse JSON data from requests

// Use the API routes and middleware
app.use("/api", apiRoutes);

const port = 3000;
app.listen(port, () => {
  console.log("Running on port: " + port);
});
