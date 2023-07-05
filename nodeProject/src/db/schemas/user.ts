import mongoose,{ Schema } from "mongoose";
import { Role } from "../models/role.js";

const userSchema = new Schema({
    username: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},
    isAdmin:{type:Boolean,default:false},
    /*
        user has roles:
      */
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: "Role"
        },
    ], 
});

export { userSchema }