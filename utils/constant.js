import crypto from 'crypto';

export const generateClientId = ()=>{
    return crypto.randomBytes(12).toString("hex");
}

export const generateClientSecret = ()=>{
    return crypto.randomBytes(18).toString("hex");
}