const express = require('express');

const app = express();

app.use("/hello", (req, res, next) => {
    next();
}, (req, res) => {
    res.send("middleware's hello")
})
app.listen(3000, ()=> {
    console.log("running");
});