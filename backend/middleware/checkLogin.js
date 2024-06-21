import jwt from 'jsonwebtoken';
import User from '../model/userSchema.js';


export const checkLogin=async(req,res,next)=>{
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(400).json({ status: "failed", message: "token missing" })
    }
    const token = await authorization.split(' ')[1]

    try {
        const validate = await jwt.verify(token, process.env.SECRET_KEY)
        req.user=await User.findById(validate.id).select('-password')
        next()

    } catch (err) {
        res.status(500).json({ status: "failed", message: "something went wrong", error: err.message })
    }
}




