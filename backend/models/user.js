const mongoose = require("mongoose")

const user = mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
        },
        email:{
            type: String,
            required: true,
        },    
        password:{
            type: String,
            required: true,
        },
        address:{
            type: String,
            required: true,
        },
        avatar:{
            type: String,
            default: "https://i.pinimg.com/236x/e3/05/e8/e305e8087ec12d3696cbef1b282681be.jpg"
        },
        role: {
            type: String,
            default: "user",
            enum: ["user","admin"], 
        },
        favourites: [
            {
                type: mongoose.Types.ObjectId,
                ref: "books",
            },
        ], 
        cart: [
            {
                type: mongoose.Types.ObjectId,
                ref: "books",
            },
        ],  
        order: [
            {
                type: mongoose.Types.ObjectId,
                ref: "orders",
            },
        ],    
    },
{timestamps: true}
);
module.exports = mongoose.model("user",user);