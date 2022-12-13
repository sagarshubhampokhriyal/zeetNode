const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const loginSchema = new Schema({
    email: {
        type : String,
        required: true
    },
    fname:{
        type: String,
        required: true
    },
    sname:{
        type: String,
        required: true
    },
    password:{
        type :String,
        required: true
    }
},{timestamps: true});

const sign=new mongoose.model('Register',loginSchema);
module.exports=sign;