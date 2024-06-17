import { CreateError } from '../../utils/function/error'
import User from "../user/model";
import JWT from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import Staff from '../staff/model';

export const register = async(req, res, next)=>{
    try {
        const { firstName, middleName, lastName, email, contactNo, 
            addressLine1, addressLine2, pincode, city, state, country,
            password, confirmPassword } = req.body;
        const userObj = {
            firstName, middleName, lastName, email, contactNo, 
            addressLine1, addressLine2, pincode, city, state, country,
            password
        };
        const user = await User.create(userObj);
        return res.status(201).json({
            error:false,
            message:'Registered Successfully',
            data:user
        });
    } catch (error) {
        console.log("Registration Error ::>>",error);
        next(error);
    }
}

export const login = async(req, res, next)=>{
    try {
        const { email, password } = req.body;
        const getUser = await User.findOne({
            email:email
        });
        if(!getUser){
            return next(CreateError(403,'Invalid credentials'));
        }
        const isMatched = bcryptjs.compareSync(password, getUser.password);
        if(!isMatched){
            return next(CreateError(403,'Invalid credentials with email and password'));
        }
        const token = JWT.sign({id:getUser._id, name:getUser.name, email:getUser.email, contactNo:getUser.contactNo}, process.env.JWT_SECRET_KEY, {expiresIn:'24h'});
        // return res.status(201).json({
        //     error:false,
        //     message:'Login Successfully',
        //     data:token,
        //     redirectUrl:`https://food-fonday.netlify.app?token=${token}`
        // });
        // return res.status(200).redirect(`http://localhost:3001?token=${token}`);

        const redirectUrl = req.session.oauth2return || '/';
            delete req.session.oauth2return;
            return res.redirect(redirectUrl);
    } catch (error) {
        console.log("Login Error ::>>",error);
        next(error);
    }
} 

export const adminLogin = async(req, res, next)=>{
    try {
        const { email, password } = req.body;
        const getStaff = await Staff.findOne({
            email:email
        });
        if(!getStaff){
            return next(CreateError(403,'Invalid credentials'));
        }
        const isMatched = bcryptjs.compareSync(password, getStaff.password);
        if(!isMatched){
            return next(CreateError(403,'Invalid credentials with email and password'));
        }
        const token = JWT.sign({id:getStaff._id, name:getStaff.name, email:getStaff.email, contactNo:getStaff.contactNo}, process.env.JWT_SECRET_KEY, {expiresIn:'24h'});
        return res.status(201).json({
            error:false,
            message:'Admin Login Successfully',
            data:token
        });
    } catch (error) {
        console.log("Admin Login Error ::>>",error);
        next(error);
    }
}