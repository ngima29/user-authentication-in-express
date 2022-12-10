const userModel = require('../models/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController{
    // user registration
    static userRegistration = async (req,res)=>{
        const {name, email, password, c_password, tc}= req.body
        const user = await userModel.findOne({email:email})
        if(user){
            res.send({"status":"failed","message":"email already exit"})
        }else{
            if(name && email && password && c_password && tc){
                if(password === c_password){
                    try {
                    const hashpassword = await bcrypt.hash(password,10)
                    const doc = new userModel({
                        name:name,
                        email:email,
                        password:hashpassword,
                        tc:tc
                    })
                    await doc.save()
                    const saved_user = await userModel.findOne({email:email})
                    /// generate jwt -- m = munites d= day
                    const token = jwt.sign({userID:saved_user._id,userEmail:saved_user.email},process.env.JWT_SECRET_KEY,{expiresIn: '5d'})
                    res.status(201).send({"status":"success","message":"user regiister successfully",
                                            "token":token})
                    } catch (error) {
                       console.log(error); 
                       res.send({"status":"failed", "message":"unable to registration "})
                    }

                }else{
                    res.send({"status":"failed","message":"password and confirm password does not match"})
                }
            }else{
                res.send({"status":"failed", "message":"all fields are require"})
            }

        }


        try {
            
        } catch (error) {
            console.log(error);
        }
    }
/// use login 

static login = async (req,res)=>{
    
    try {
        const {email,password}= req.body
      if(email && password){
        const user = await userModel.findOne({email:email})
        if(user){
            const isMatch =await bcrypt.compare(password,user.password)
            if(user.email === email && isMatch){
                // generete token
    
                const token = jwt.sign({userID:user._id, userEmail:user.email},process.env.JWT_SECRET_KEY,{expiresIn: "5d"})
                res.send({"status":"success","message":"yor are login",
                            "token": token})
            }else{
                res.send({"status":"failed","message":"email or password does not match"})
            
            }

        }else{
            res.send({"status":"failed","message":"you are not a register user"})
        }
      }else{
        res.send({"status":"failed","message":"all fields are required"})
      }
    } catch (error) {
        console.log(error);
        res.send({"status":"failed","message":"something went wrong"})
    }
} 
/// change password
static changePassword = async (req,res)=>{
    const {password,c_password} = req.body
    if(password && c_password){
        if(password === c_password){
            try {
                const hashpassword = await bcrypt.hash(password,10)
              // console.log(req.user_id);
              await userModel.findByIdAndUpdate(req.user._id, {$set:{password:hashpassword}})
                res.send({"status":"success","message":"password change successfully"}) 
        
            } catch (error) {
                console.log(error);
                res.send({"status":"failed","message":"sorry password not updated"})
            }

        }else{
            res.send({"status":"failed","message":"password and confirm password not match"}) 
        
        }
    }else{
        res.send({"status":"failed","message":"all fielsd are required"})
    }  
}

/// logged user

static loggedUser = async (req,res)=>{
    res.send({"user": req.user})
}

/// send user password rest emamail

static sendPasswordResetEmail = async (req,res)=>{
    const {email} = req.body
    if(email){
        const user = await userModel.findOne({email:email})
        if(user){
             
        }else{
     res.send({"status":"failed","message":"email doesnot exit"})   
    }
    }else{
     res.send({"status":"failed","message":"email field is required"})   
    }

}
    
}// closing class

module.exports = UserController