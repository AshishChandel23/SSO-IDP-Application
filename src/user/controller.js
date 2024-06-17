import User from "./model";

export const getUserById = async(req, res, next)=>{
    try {
        const {userId} = req.body;
        const getUser = await User.findById(userId);
        const {password, ...user} = getUser._doc;
        return res.status(200).json({
            error:false,
            message:'User Feteched Successfully',
            data:{...user}
        })
    } catch (error) {
        console.log("Get User Error ::>>", error);
        next(error);
    }
}

export const deleteUserById = async(req, res, next)=>{
    try {
        const { userId } = req.body;
        const deletedUser = await User.findByIdAndDelete(userId);
        return res.status(201).json({
            error:false,
            message:'User Deleted Successfully',
            data:deletedUser
        })
    } catch (error) {
        console.log("Delete User By Id Error ::>>", error);
        next(error);
    }
}

export const getAllUser = async(req, res, next)=>{
    try {
        const users = await User.find();
        return res.status(200).json({
            error:false,
            message:'All User Feteched Successfully',
            data:users
        })
    } catch (error) {
        console.log("Get All User Error ::>>", error);
        next(error);
    }
}