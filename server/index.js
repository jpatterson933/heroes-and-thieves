const express = require("express");
// connect to our local mongoose db
const db = require("./config/connection");
// enable cors since we are using different 
const cors = require("cors");
// we will need to setup some routes and then setup app.use(routes)
const routes = require("./routes");

// define a PORT
const PORT = 3001;
// setup express
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// this middleware allows for us to run two different servers that interact in our react app when we do acios requests
app.use(cors());
app.use(routes);

// error catching for db connection
db.on("error", (error) => {
    console.log(error, "error with stuff")
})

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`api server listening on port ${PORT}`)
    })
})