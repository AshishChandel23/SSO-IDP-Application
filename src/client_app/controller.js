import { generateClientId, generateClientSecret } from "../../utils/constant";
import { CreateError } from "../../utils/function/error";
import ClientApplication from "./model";

export const registerAppication = async(req, res, next)=>{
    try {
        const { applicationName, url, callbackUrl } = req.body;
        const registerApplicationObj = {
            applicationName,
            url,
            callbackUrl,
            clientId:generateClientId(),
            clientSecret:generateClientSecret()
        }
        const registeredApplication = await ClientApplication.create(registerApplicationObj);
        return res.status(201).json({
            error:false,
            message:'Registered Application Successfully',
            data:registeredApplication
        })
    } catch (error) {
        console.log("Register Application Error ::>>",error);
        next(error);
    }
}

export const getClientApplicationById = async(req, res, next)=>{
    try {
        const {applicationId} = req.body;
        const application = await ClientApplication.findById(applicationId);
        return res.status(200).json({
            error:false,
            message:'Client Application Feteched Successfully',
            data:application
        })
    } catch (error) {
        console.log("Get Client Application Error ::>>", error);
        next(error);
    }
}

export const deleteClientApplicationById = async(req, res, next)=>{
    try {
        const { applicationId } = req.body;
        const deletedApplication = await ClientApplication.findByIdAndDelete(applicationId);
        return res.status(201).json({
            error:false,
            message:'Client Application Details Deleted Successfully',
            data:deletedApplication
        })
    } catch (error) {
        console.log("Client Application Details Deleted By Id Error ::>>", error);
        next(error);
    }
}

export const regenrateIdAndSecretByAppId = async(req, res, next)=>{
    try {
        const {applicationId} = req.body;
        const application = await ClientApplication.findById(applicationId);
        if(!application){
            return next(CreateError(403, 'Application Not found'));
        }
        const updateApplication = await ClientApplication.findByIdAndUpdate(applicationId,{
            clientId:generateClientId(),
            clientSecret:generateClientSecret()
        },
        { new:true} );
        return res.status(200).json({
            error:false,
            message:'Client Application updated Successfully',
            data:updateApplication
        })
    } catch (error) {
        console.log("Get Client Application Error ::>>", error);
        next(error);
    }
}

export const getAllregisterAppication = async(req, res, next)=>{
    try {
        let { page, limit } = req.body;
        page = page || 1;
        limit = limit || 10;
        const offset = limit * (page-1);
        const allApp = await ClientApplication.find().limit(limit).skip(offset);
        const total = await ClientApplication.countDocuments();
        return res.status(201).json({
            error:false,
            message:'All Register Application Fetched Successfully',
            totalInAPage : allApp.length,
            total,
            data:allApp
        })
    } catch (error) {
        console.log("Get All Register App Error ::>>", error);
        next(error);
    }
}
