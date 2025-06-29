import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../cofig/token.js";

export const signUp = async (req,res)=>{
    try {
        const {name, password, email} = req.body
        const existEmail =await User.findOne({email})

        if(existEmail){
            return res.status(400).json({message:"email already exists!!!"})
        }

        if(password.length<6){
            return res.status(400).json({message:"password must be atleast 6 characters!!!"})
        }

        const hashPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            name, password: hashPassword, email
        })

        const token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"None",
            secure:true
        })

        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({message:`sign up error ${error}`})
    }
}

export const logIn = async (req,res)=>{
    try {
        const {password, email} = req.body
        const user =await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"email does not exists!!!"})
        }

        const isMatched = await bcrypt.compare(password,user.password)

        if(!isMatched){
            return res.status(400).json({message:"Incorrect Password"})
        }       

        const token = await genToken(user._id)
        
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"None",
            secure:true
        })

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({message:`logIn error ${error}`})
    }
}

export const logOut = async (Req,res)=>{
    try {
        res.clearCookie("token")

         return res.status(200).json({message:"log out Successfully!!!"})
    } catch (error) {
        return res.status(500).json({message:`logOut error ${error}`})
    }
}
