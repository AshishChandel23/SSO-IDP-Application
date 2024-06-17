import mongoose, { Schema } from "mongoose";

const authorizationCodeSchema = new Schema({
    authCode:String,
    info:{
        clientId:String,
        userId:String
    }
},{
    timestamps:true
});

export const AuthorizationCode = mongoose.model('authorizationcode', authorizationCodeSchema);

const tokenSchema = new Schema({
    userId:String,
    user:Object,
    accessToken:String,
    refreshToken:String,
    expireIn:Date
},{
    timestamps:true
});

export const TokenCode = mongoose.model('tokencode', tokenSchema);