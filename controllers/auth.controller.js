import {Users} from "../models/users.model.js"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, UnauthenticatedError } from "../errors/index.js"

const register = async(req, res) => {
      const { name, email, password } = req.body;
      const userAlreadyExist = await Users.findOne({email})

        if(!name || !email || !password) {
            throw new BadRequestError("please provide all values")
        }

        if(userAlreadyExist) {
            throw new BadRequestError("user with that email already exists")
        }

        const user = new Users({ name, email, password})
        const token = user.createJWT()
        await user.save()

        res.status(StatusCodes.CREATED).json({user: { 
            name: user.name, email: user.email, 
            lastName: user.lastName },
            location: user.location, 
            token
        })
}


const login = async(req, res) => {
   const { email, password } = req.body;

   if(!email || !password) {
        throw new BadRequestError("please provide all values")
   }

   const user = await Users.findOne({ email}).select('+password');
   if(!user) {
     throw new UnauthenticatedError("invalid credentials")
   }

   const isCorrectPassword = await user.comparePassword(password);
   const token = user.createJWT()

   if(!isCorrectPassword) {
     throw new UnauthenticatedError("invalid credentials")
   }

//    just to hide password
   user.password = undefined;
   res.status(StatusCodes.OK).json({user, token, location: user.location})

}

const updateUser = async(req, res) => {
  const { email, name, lastName, location } = req.body
  
   if(!email || !lastName || !location || !name) {
     throw new BadRequest(" please provide all values")
   }
   
   const user = await Users.findOne({ _id: req.user.userId })

   user.email = email;
   user.name = name;
   user.lastName = lastName;
   user.location = location 

   const token = user.createJWT()
   await user.save()

   res.status(StatusCodes.CREATED).json({user, token, location: user.location})
}


export { register, login, updateUser }