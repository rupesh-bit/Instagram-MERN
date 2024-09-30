import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'
import jwt from 'jsonwebtoken'
import {User} from './models/user.model.js'


dotenv.config({
    path: './.env'
})


connectDB()
.then(() => {
      app.get('/gg',async(req,res)=>{
            try {
    
            const ss =await User.findById(req.user?._id).select("-password")
          
           if(!ss){
           throw {code:406,                                             
            message: "hkjgkhhj"}
         }
         
        return res
        .status(203)
        .json({
            user:ss,
            cookies: "LLL"
        })
        } catch (err) {
            res.status(err.code || 500).json({
                             success: false,
                        message: err.message
                       })
        }
      })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })

})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})



