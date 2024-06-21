import { Schema,model } from 'mongoose'

const ReviewModel=Schema({
    UserId:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    PostId:{
        type:String
    },
    Rating:{
        type:Number,
        required:true,
        minLength:1
    }
 
},{versionKey:false,timestamps:true})

const Review=model('review',ReviewModel)


export default Review;
