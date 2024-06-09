const mongoose = require("mongoose")

const enquirySchema = new mongoose.Schema({
   fname:{
    type:String,
    required:true
   },
   lname:{
    type:String,
    required:true
   },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true

    }
},{timestamps:true})

const Enquiry = mongoose.model("Enquiry",enquirySchema)
module.exports=Enquiry