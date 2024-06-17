import mongoose, { Schema } from "mongoose";

const ClientApplicationSchema = new Schema({
    applicationName:String,
    url:String,
    callbackUrl:String,
    clientId:String,
    clientSecret:String,
},{
    timestamps:true
});

const ClientApplication = mongoose.model('ClientApplication', ClientApplicationSchema);
export default ClientApplication;