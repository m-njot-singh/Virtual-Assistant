import { response } from "express"
import uploadOnCloudinary from "../cofig/cloudinary.js"
import geminiResponse from "../gemini.js"
import User from "../models/user.model.js"
import moment from "moment"

export const getCurrentUser = async (req,res)=>{

    try {
        const userId = req.userId
        const user =await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message:"user not Found!!!"})
        }

        return res.status(200).json(user)

    } catch (error) {
        console.log(error);
        
        return res.status(400).json({message:"get Current user Error!!!"})
    }
}


export const updateAssistant = async (req,res)=>{

    try {
        const {assistantName, imageUrl} = req.body
        let assistantImage ;
        if(req.file){
            assistantImage = await uploadOnCloudinary(req.file.path)
        }else{
            assistantImage = imageUrl
        }


        const user = await User.findByIdAndUpdate(req.userId,{assistantName, assistantImage},{new: true}).select("-password");

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        
        return res.status(400).json({message:"Update Assistant Error!!!"})
    }
    
}


export const askToAssistant = async(req,res)=>{
    try {
        const {command} = req.body
        if(!command){
            return res.status(400).json({error: "Missing command"});
        }
        const user =await User.findById(req.userId)
        if(!user){
            return res.status(400).json({error:"User not Found"});
        }
        user.history.push(command)
        user.save()
        const userName = user.name
        const assistantName = user.assistantName

        const result = await geminiResponse(command,assistantName,userName)
        
        let gemResult;
        if(typeof result === "string"){
            let clean = result.trim();
            if (clean.startsWith("```")) {
                clean = clean.replace(/```[a-zA-Z]*\n?/, "").replace(/```$/, "");
            }
            try {
                gemResult = JSON.parse(clean);
            } catch (error) {
                const jsonMatch = clean.match(/{[/s/S]*}/)
                if(jsonMatch){
                    gemResult = JSON.parse(jsonMatch[0]);
                }else{
                    return res.status(400).json({response:"Sorry ! i can't understatnd"})
                }
                    
            }
        }else {
            gemResult=result;
        }
        
        const type = gemResult.type
        
        switch (type) {
            case 'get_date':
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Current date is ${moment().format("YYYY-MM-DD")}`
                });
            case 'get_time':
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Current time is ${moment().format("hh:mm A")}`
                });
            case 'get_day':
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Current day is ${moment().format("dddd")}`
                });
            case 'get_month':
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Current month is ${moment().format("MMMM")}`
                });
            case 'google_search':
            case 'youtube_search':
            case 'youtube_play':
            case 'calculator_open':
            case 'instagram_open':
            case 'facebook_open':
            case 'weather_show':
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: gemResult.response,
                })
            case 'general':
            default : 
                return res.json(gemResult)
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({response:"ask assistant error"})
        
    }
}