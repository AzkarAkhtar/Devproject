const express = require('express');
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json())

app.post("/signup", async (req, res) => {
    const User1 = new User(req.body);

    await User1.save();
    res.send("new data added");
    console.log(req.body);

});

app.get("/feed", async (req, res) => {
    const getuser = await User.find();
    res.send(getuser);

})

app.get("/lastname", async(req, res) => {
    const getlast = req.body.lastName;
    res.send(await User.find({lastName : getlast}));
})

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