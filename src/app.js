const express = require('express');
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json())

app.post("/signup", async (req, res) => {
    const User1 = new User({
        firstName : "Azk",
        lastName : "Akh",
        age : 28
    });

    await User1.save();
    res.send("new data added");
    console.log(req.body);

});

connectDB()
.then( ()=> {
    console.log("connected");
    app.listen(3000, ()=> {
    console.log("running");}
)
}
)
.catch(()=> {
    console.log("not connected");
});