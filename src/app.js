import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app= express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))
app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true})) //for url endoding
app.use(express.static("public")) //save images in own server
app.use(cookieParser())
export{app}