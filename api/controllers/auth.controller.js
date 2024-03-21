import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import  jwt  from 'jsonwebtoken';
export const signup = async (req,res,next)=>{
    const { username , email,password}= req.body;
    if(!username || !email || !password || username==="" || email==="" ||password===""){
        next(errorHandler(400,'ALL fields are required'));
    }


    const hashPassword = await bcrypt.hash(password,10);


    const newUser = User({
        username,
        email,
        password:hashPassword
    })
    try{
        await newUser.save();
        res.json("sign up successfull");
    }
    catch(err){
        next(err);
    }
    
}   



export const signin = async (req, res, next)=>{
        const { email , password} = req.body;
        if(  !email || !password || email==="" ||password===""){
            next(errorHandler(400,'ALL fields are required'));
        }
        try{
            const validUser = await User.findOne({email})
            if(!validUser){
                 next(errorHandler(404,"wrong credentials"))
            }
            const validPassword = await bcrypt.compare(password,validUser.password)
            if(!validPassword){
                return next(errorHandler(404,"wrong credentials"));
            }
            const { password:pass , ...rest }= validUser._doc;

            const token = jwt.sign(
                { id:validUser._id, isAdmin:validUser.isAdmin } ,
                process.env.JWT_SECRET 
                )
                res.status(200).cookie('access_token', token, {
                    httpOnly:true

                }).json(rest)

        }catch(err){
            next(err);
        }

}

export const google = async ( req, res, next)=>{
    const { email ,name, googlePhotoUrl} = req.body;
    try{
        const user = await User.findOne({email})
        if(user){
            const { password:pass , ...rest }= validUser._doc;
            const token = jwt.sign(
                { id:user._id, isAdmin:user.isAdmin },
                process.env.JWT_SECRET 
                )
                res.status(200).cookie('access_token', token, {
                    httpOnly:true

                }).json(rest)

        }else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashPassword = await bcrypt.hash(generatedPassword,10);
            const newUser= new User({
                username:name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password:hashPassword,
                profilePicture:googlePhotoUrl
            })
            await newUser.save();
            const { password:pass , ...rest }= validUser._doc;
            const token = jwt.sign(
                { id:user._id ,isAdmin:newUser.isAdmin },
                process.env.JWT_SECRET 
                )
                res.status(200).cookie('access_token', token, {
                    httpOnly:true

                }).json(rest)
        }

    }catch(err){
        next(err);
    }
    



}