const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173',
}

app.use(cors(corsOptions));

mongoose.connect("mongodb://localhost:27017/profilesDB")
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.error("MongoDB connection error: "+err));

const profileSchema = new mongoose.Schema({
    personalinfo: {
        name: String,
        email: String,
        phone: String,
    },
    education: {
        degree: String, 
        instituion: String, 
        year: String,
    },
    interests: [String],
    achievements: [String],
});

const Profile = mongoose.model("Profile", profileSchema);

app.post("/profile", async(req, res)=>{
    try {
        const data = req.body;
        data.interests = data.interests.split(",");
        data.achievements = data.achievements.split(",");
        const profile = new Profile(data);
        await profile.save();
        res.status(201).json({message:"Profile saved!"});
    } catch(err){
        res.status(400).json({message:"Failed to save profile", error: err});
    }
});

app.get("/profiles", async(req, res)=>{
    try {
        const profiles = await Profile.find({},{_id:0});
        res.status(200).json(profiles);
    } catch(err){
        res.status(500).json({message:"Failed to fetch profiles", error: err});
    }
});

const PORT = 5000;
app.listen(PORT, ()=>{
    console.log("Server is running at http://localhost:"+PORT);
});