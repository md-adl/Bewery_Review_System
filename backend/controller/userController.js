import User from '../model/userSchema.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Review from '../model/review.js';



export const signup = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10)
        const hashPwd = await bcrypt.hash(password, salt)
        const create_data = await User.create({ email, firstName, lastName, password: hashPwd })
        res.status(201).json({ status: "successful", message: "user created" })

    } catch (err) {
        if (err.message.includes('email_1 dup key')) {
            res.status(400).json({ status: "failed", message: "User Already Exist" })
        } else {
            res.status(500).json({ status: "failed", message: "Please Provide Correct Details", error: err.message })
        }

    }

}

export const login = async (req, res) => {
    const id = req.id
    // const options = {secure: true,maxAge:7*24*60*60*1000 ,httpOnly: true  }
    try {
        const token = jwt.sign(
            {
                id
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '24h'
            }
        )

        res.cookie('token', token)
        res.status(200).json({ status: "Success", token })

    } catch (err) {
        res.status(500).json({ status: "failed", message: err.message })
    }
}
export const logout = async (req, res) => {

    // const options = {secure: true,maxAge:7*24*60*60*1000 ,httpOnly: true  }

    try {
        res.clearCookie('token')
        res.status(200).json({ status: "Success", message: 'user logout successful' })

    } catch (err) {
        res.status(500).json({ status: "failed", message: err.message })
    }
}

// --> /use?search=varish
export const allUsers = async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: 'i' } },
                { email: { $regex: req.query.search, $options: 'i' } },
            ],
        }
        : {}

    const users=await User.find(keyword).find({_id:{$ne:req.user._id}})
    res.send(users)
}


export const User_Review = async (req, res) => {
    const {PostId}=req.params
    const {Rating}=req.body
    const {_id} = req.user

    try {
        const createReview=await Review.create({
            UserId:_id,
            PostId,
            Rating
        })
      res.status(201).json({ status: "successful", message: "user created",createReview})
    } catch (error) {
        res.status(500).json({ status: "failed", message: err.message })
    }
}


