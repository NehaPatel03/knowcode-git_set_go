const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanyUserSchema = new Schema({
    companyName: {type: String, required: true},
    regiNo: {type: Number, required: true},
    contactPerson: {type: String, required: true},
    loc: {type: String, required: true},
    email: {type:String, required: true, unique: true},
    pass: {type: String, required: true}
})

module.exports = mongoose.model("CompanyUser", CompanyUserSchema);