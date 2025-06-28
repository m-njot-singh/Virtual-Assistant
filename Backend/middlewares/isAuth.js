import jwt from "jsonwebtoken"
const isAuth = async(req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(400).json({message:"Token not Found!!!"})
        }
        const verifyToken =await jwt.verify(token,process.env.JWTSECRET_KEY)

        req.userId = verifyToken.userId

        next()
    } catch (error) {
        console.log(error);
        
        return res.status(400).json({message:"is Auth Error!!!"})
    }
}

export default isAuth
