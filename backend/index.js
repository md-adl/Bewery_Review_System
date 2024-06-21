// import express from "express"
import dotEnv from 'dotenv';
import {app} from '../backend/app.js'

dotEnv.config()
import '../backend/connectDb.js'



app.get('/', (req, res) => {
    res.send("Api is running.....")
})


app.listen(process.env.PORT, () => {
    console.log(`Server Running on ${process.env.PORT}`)
})