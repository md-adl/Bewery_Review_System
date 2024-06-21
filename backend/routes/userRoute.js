import express from 'express'
import  {Authentication}  from '../middleware/Authentication.js'
import { User_Review, allUsers, login, logout, signup } from '../controller/userController.js'
import { checkLogin } from '../middleware/checkLogin.js'

const route=express.Router()


route.post("/signup",signup)
route.post("/login",Authentication,login)
route.post("/logout",logout)
route.get("/all",checkLogin,allUsers)
route.get("/review/:PostId",checkLogin,User_Review)



export default route