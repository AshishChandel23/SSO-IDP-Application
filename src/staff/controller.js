import Staff from "./model";


export const addStaff = async(req, res, next)=>{
    try {
        const { name, email, contactNo, password } = req.body;
        const staffObj = {
            name,
            email,
            contactNo,
            password
        };
        const newStaff = await Staff.create(staffObj);
        return res.status(201).json({
            error:false,
            message:'Staff created Successfully',
            data:newStaff
        })
    } catch (error) {
        console.log("Add Staff Error ::>>", error);
        next(error);
    }
}

export const deleteStaffById = async(req, res, next)=>{
    try {
        const { staffId } = req.body;
        const deletedStaff = await Staff.findByIdAndDelete(staffId);
        return res.status(201).json({
            error:false,
            message:'Staff Deleted Successfully',
            data:deletedStaff
        })
    } catch (error) {
        console.log("Delete Staff By Id Error ::>>", error);
        next(error);
    }
}

export const getAllStaff = async(req, res, next)=>{
    try {
        let { page, limit } = req.body;
        page = page || 1;
        limit = limit || 10;
        const offset = limit * (page-1);
        const allStaff = await Staff.find().limit(limit).skip(offset);
        const total = await Staff.countDocuments();
        return res.status(201).json({
            error:false,
            message:'All Staff Fetched Successfully',
            totalInAPage : allStaff.length,
            total,
            data:allStaff
        })
    } catch (error) {
        console.log("Get All Staff Error ::>>", error);
        next(error);
    }
}