const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SHGUserSchema = new Schema({
    orgName: {type: String, required: true},
    leadName: {type: String, required: true},
    uid:{type:Number, required:true},
    members:{type:Number, required:true},
    loc:{type:String, required:true},
    description:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    pass:{type:String, required:true},
});
module.exports = mongoose.model("User", SHGUserSchema);