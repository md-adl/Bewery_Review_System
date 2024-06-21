import { Schema,model } from 'mongoose'

const userModel=Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true,
        minLength:2
    },
    lastName:{
        type:String,
        required:true,
        minLength:2
    },
    password:{
        type:String,
        required:true,
    },
    pic:{
        type:String,
        default:'https://www.chem.indiana.edu/wp-content/uploads/2023/09/defaultpic.jpg'
    }
 
},{versionKey:false,timestamps:true})

const User=model('user',userModel)


export default User;
