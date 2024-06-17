import mongoose from "mongoose";
import colors from 'colors';

export const DBConnect = ()=>{
    const MONGODB_URI = process.env.MONGODB_URI;
    mongoose.connect(MONGODB_URI)
    .then(()=>{
        console.log(colors.green.underline("|--- Database Connected Successfully ---|"));
    })
    .catch((error)=>{
        console.log(colors.red("|--- Database Connection Error ---|",error));
    });
}