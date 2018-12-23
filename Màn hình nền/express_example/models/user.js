import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema ({
    _id: mongoose.Types.ObjectId,
    userName: {
        type: String,
        required: 'Please enter your name',
        trim: true
    },
    password: {
        type: String,
    },
    fullname: {
        type: String
    }
});

module.exports = mongoose.model('user',userSchema);