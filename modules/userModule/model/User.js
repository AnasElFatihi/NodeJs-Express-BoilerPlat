const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name :{
        type:String,
        required:true,
        min:6,
        max:40
    },
    email :{
        type:String,
        required:true,
        min:6
    },
    password :{
        type:String,
        required:true,
        max:1024
    },

},
{
    timestamps: true,
    versionKey: false
});


module.exports = mongoose.model('User',userSchema);
