const express = require("express");
// connect to our local mongoose db
const db = require("./config/connection");
// we will need to setup some routes and then setup app.use(routes)

// define a PORT
const PORT = 3001;
// setup express
const app = express();

db.on("error", (error) => {
    console.log(error, "error with stuff")
})

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`api server listening on port ${PORT}`)
    })
})