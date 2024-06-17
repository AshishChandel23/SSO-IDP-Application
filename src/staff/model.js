import mongoose, { Schema } from "mongoose";
import bcryptjs from 'bcryptjs';

const staffSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    contactNo:{
        type:Number
    },
    password:{
        type:String
    },
},{
    timestamps:true
});

staffSchema.pre('save', async function(next) {
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

const Staff =  mongoose.model('Staff', staffSchema);
export default Staff;