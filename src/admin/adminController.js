import ClientApplication from "../client_app/model";
import Staff from "../staff/model";
import User from "../user/model";

export const getDashBoardDetails = async(req, res, next)=>{
    try {
        const users = await User.countDocuments();
        const applications = await ClientApplication.countDocuments();
        const staffs = await Staff.countDocuments();
        return res.status(200).json({
            error:false,
            message:"Got the Dashboard Details Successfully",
            data:{users,applications,staffs}
        })
    } catch (error) {
        console.log("Get Dashboard Details Error ::>>", error);
    }
}