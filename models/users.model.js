import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
     name: { 
          type: String, 
          required: [true, 'please provide name'] ,
          maxLength: 20,
          minLength: 3,
          trim: true
     },
     email: { 
          type: String, 
          required: [true, 'please provide email'] ,
          validate:{
               validator: validator.isEmail,
               message: "please provide an valid email"
          },
          maxLength: 30,
          minLength: 3,
          unique: true
     },
     password: { 
          type: String, 
          required: [true, 'please provide password'] ,
          minLength: 6,
          select: false
     },
     lastName: { 
          type: String, 
          trim: true,
          maxLength: 20,
          default: "last name"
     },
     location: { 
          type: String, 
          trim: true,
          maxLength: 20,
          default: "jakarta"
     },
    
}, 
  {timestamps: true })

  UserSchema.pre("save", async function() {
     // if password is not modified, then return
      if(!this.isModified('password')) return

     const salt = await bcrypt.genSalt(10)
     this.password = await bcrypt.hash(this.password, salt)
  })

//   mongoose custom method for create jwt token 
  UserSchema.methods.createJWT = function() {
     return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
  }

//   custom method for comparing passsword
  UserSchema.methods.comparePassword = async function(userPassword) {
     const isMatch = await bcrypt.compare(userPassword, this.password)

     return isMatch;
  }

export const Users = mongoose.model("Users", UserSchema)