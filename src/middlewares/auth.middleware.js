import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const varifyJWT =  asyncHandler(async(req,res,next)=>{
   try {
      const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
      if(!token){
       throw new ApiError(401,"Unauthorized Request")
      }
   const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
   const user = await User.findById(decodeToken?._id).select("-password -refreshToken")
   if(!user){
      // to do discussion about frontend
      throw new ApiError(401, "Invalid Access Token")
   }
   
   req.user = user; //adding new object to req
   next()
   } catch (error) {
      throw new ApiError(401,error?.message || "invalid Access Token")
   }
})
