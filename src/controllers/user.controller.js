import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req,res)=>{
    // get user detail from frontend
    // validation -- not empty
    // check if user already exist :username , email
    // check for images , check for avatar
    // upload them to cloudinary , avatar
    // create user object -create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const {fullName,email,username,password}  = req.body
    console.log("email",email);
// if(fullName === ""){
// throw new ApiError(400,"FullName Is Required")
// }
if([
    fullName,email,username,password
].some((field)=>
    field?.trim() === ""
)){
    throw new ApiError(400,"All Fields Is Required")   
}
const existedUser = User.findOne({
    $or:[{username},{email}]
})

if(existedUser){
    throw new ApiError(409,"Username already exist")
}

const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImagePath = req.files?.coverImage[0]?.path;

if(!avatarLocalPath){
    throw new ApiError(400,"Avatar File Is Required")
}
const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImagePath)

if(!avatar){
    throw new ApiError(400,"Avatar File Is Required")
}

 const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
})
   const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )
   if(!createUser){
    throw new ApiError(500, "something Went Wrong while registering")
   }
   return res.status(201).json(
    new ApiResponse(200, createUser,"User Registered Succesfully")
   )
})

export {registerUser}