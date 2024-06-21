import bcrypt from 'bcrypt'
import User from '../model/userSchema.js'


export const Authentication=async(req,res,next)=>{
    const { email, password } = req.body

    try{
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ status: "failed", message: "User Not Found" })
        }
        const hash = await bcrypt.compare(password, user.password)

        if (!hash) {
            return res.status(400).json({ status: "failed", message: "Incorrect password" })
        }
        req.id=user._id
        next()
    }catch(err){
          res.status(500).json({status:"failed",message:err.message})
    }


}

