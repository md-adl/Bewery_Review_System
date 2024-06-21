import { connect } from 'mongoose'

const ConnectDb = async () => {

    try {
        // const db = await connect(process.env.DB_URL)
        const db=await connect('mongodb+srv://mdadil88040:NFOZHc7liFYmD4hv@cluster0.iwfebk0.mongodb.net/Moenage?retryWrites=true&w=majority&appName=Cluster0')
        console.log("connect DB")
    } catch (err) {
        console.log(`error ${err.message}`)
    }
}

ConnectDb()


