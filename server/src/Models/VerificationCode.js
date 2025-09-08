const {mongoose, Schema} = require('mongoose');

// Email otp verification schema
const verificationCodeSchema = new mongoose.Schema({
    otp: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }
}, { timestamps: true });

const VerificationCode = mongoose.model('VerificationCode', verificationCodeSchema);

module.exports = VerificationCode;
