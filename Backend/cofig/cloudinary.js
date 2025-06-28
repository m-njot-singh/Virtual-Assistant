import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
const uploadOnCloudinary = async (filePath)=>{
      // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
    });

    try {
        const uploadResult = await cloudinary.uploader
       .upload(filePath)
       fs.unlinkSync(filePath)
       return uploadResult.secure_url
    } catch (error) {
        fs.unlinkSync(filePath)
        return res.status(500).json({message:"Cloudinary Error!!!"})
    }
}

export default uploadOnCloudinary