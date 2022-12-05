import  {UnauthenticatedError} from "../errors/index.js";
import jwt from "jsonwebtoken"

const auth = async(req, res, next) => {
     const authHeader = req.headers.authorization;
     let token;

     
     if(!authHeader || !authHeader.startsWith("Bearer")) {
          throw new UnauthenticatedError("authentication invalid")
     } 
     
     if(authHeader) {
          token = authHeader.split(" ")[1]
     }

     try {
          const payload = jwt.verify(token, process.env.JWT_SECRET)
          req.user = payload;

          next()
     } catch (error) {
          throw new UnauthenticatedError("authentication invalid")
     }

}

export default auth;