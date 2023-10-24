import jwt from "jsonwebtoken"
import dotenv from "dotenv"


dotenv.config({
  path: './data/.env'
});
 
export const sendCookie =(user, res, message, statusCode = 200)=>{
     // Generate a JSON Web Token (JWT)
     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

     // Return the result
     return res
       .status(statusCode) // 201 Created status code for successful resource creation
       .cookie("token", token, {
         httpOnly: true,
         maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
         sameSite:  process.env.NODE_ENV === "Development"? "lax": "none",
         secure: process.env.NODE_ENV === "Development"? false : true 
       })
       .json({
         success: true,
         user, // Make sure 'user' contains user data
         message: message,
       });
}