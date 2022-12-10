const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

var checkUserAuth = async(req,res,next)=>{
 let token 
 const {authorization }= req.headers
 if(authorization && authorization.startsWith('Bearer')){
    // // let token = req.headers.authorization
    //     if(token){
    //         token= token.split(" ")[1]
    //         const {userID}= jwt.verify(token,process.env.JWT_SECRET_KEY)
    //         req.user = await userModel.findById(userID).select('-password')

    //     }  // same ho 

    try {
        // get token from header  
        token = authorization.split(' ')[1]
        
        // verify token
        const {userID}= jwt.verify(token,process.env.JWT_SECRET_KEY)
       //console.log(userID);
        // get user from token
        req.user = await userModel.findById(userID).select('-password')
        //console.log(req.user);
        next()
    } catch (error) {
        console.log(error);
        res.status(401).send({"status":"failed","message":"unauthorized user"})
    }
 }
 if(!token){
    res.status(401).send({"status":"failed","message":"unauthorized user, No token"})
 }

}



module.exports = checkUserAuth