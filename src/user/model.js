import mongoose, { Schema } from "mongoose";
import bcryptjs from 'bcryptjs';

const userSchema = new Schema({
    accountId:String,
    firstName:{
        type:String
    },
    middleName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    contactNo:{
        type:Number
    },
    addressLine1:String,
    addressLine2:String,
    pincode:String,
    city:String,
    state:String,
    country:String,
    password:{
        type:String
    },
},{
    timestamps:true
});

userSchema.pre('save', async function(next) {
    try {
      if (this.isModified('password') || this.isNew) {
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(this.password, salt);
        this.password = hash;
      }
      next();
    } catch (error) {
      next(error);
    }
  });

const User =  mongoose.model('User', userSchema);
export default User;