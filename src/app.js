const express = require('express');
const connectDB = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/authentication");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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




// app.post("/signup", async (req, res) => {

//     try{
        
//         //validation for signup
//         validateSignup(req);
        
//         const {firstName, lastName, password, emailId, age, photoUrl} = req.body;

//         const passwordHash = await bcrypt.hash(password, 10);

//         const User1 = new User({
//             firstName,
//             lastName,
//             password : passwordHash,
//             emailId,
//             age,
//             photoUrl
//         });
//         await User1.save();
//         res.send("new data added");
  
//     }

//     catch(e) {
//         res.status(400).send(e.message);
//     }

// });

// app.get("/feed", async (req, res) => {
//     const getuser = await User.find();
//     res.send(getuser);
//     //bcrypt password
//         // const passwordHash = await bcrypt.hash(password, 10);

// });

// app.post("/login", async(req, res) => {

//     const {emailId, password} = req.body;

//    const loginuser = await User.findOne({emailId: emailId});
   
//    if(!loginuser) { 
//     return res.status(400).send({error : "Invalid Login Credentials"});
//    }
//     const ispasswordvalid = await bcrypt.compare(password, loginuser.password);
    
//     if(ispasswordvalid) {

//         const token = jwt.sign({_id : loginuser._id}, "secretkey12345", {expiresIn : "1h"});
//         res.cookie("token", token);
//     }

//     if(!ispasswordvalid) {
//         return res.status(400).send({error : "Invalid Login Credentials"});
//     }

//     res.send(loginuser);
// });

// app.patch("/update", async(req, res) => {
//     let id;
//     try {
//         const cookie = req.cookies;
//         if (!cookie.token) {
//             return res.status(401).send({ error: "No token in cookie!" });
//         }
//         const verifytoken = jwt.verify(cookie.token, "secretkey12345");
//         id = verifytoken._id;
//     } catch (error) {
//         return res.status(401).send({ error: "Invalid or expired token!" });
//     }

//     const update = req.body;
//     const isValid = updatevalidation(req);
//     if (!isValid) {
//         return res.status(400).send({ error: "Invalid Updates!" });
//     }

//     try {
//         if (update.password) {
//             update.password = await bcrypt.hash(update.password, 10);
//         }
//         await User.findByIdAndUpdate(id, update, { runValidators: true });
//         res.send("updated");
//     } catch (error) {
//         res.status(500).send({ error: "Update failed", details: error.message });
//     }
// });

// app.delete("/delete", async(req, res) => {
//     const id1 = req.body.id;
//     const updatefirst = req.body;
//     console.log(id1);
//     await User.findByIdAndDelete(id1, updatefirst);
//     res.send("deleted");
// });

// app.get("/viewprofile", async(req, res) => {
//     const cokkie = req.cookies;
//     const verifytoken = jwt.verify(cokkie.token, "secretkey12345");
//     const id = verifytoken._id;

//     res.send(await User.findById({_id: id }));
// });

// app.post("/logout", async(req, res) => {
//     res.cookie("token", null, {expires: new Date(Date.now())});
//     res.send("Logout Successful")
// });