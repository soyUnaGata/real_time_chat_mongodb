import User from "./models/User.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { secret } from "./config.js";
import bcrypt from "bcryptjs";

const generateAccessToken = (id, username) => {
    const payload = {
        id,
        username
    }
    return jwt.sign(payload, secret, {expiresIn: "12h"})
}

class authController {
    async register(req, res){
        try{
            const erorrs = validationResult(req);
            if(!erorrs.isEmpty()){
                return res.status(400).json({message: "Username or password is not correct", erorrs})
            }
            const { username, password } = req.body;
            const isUser = await User.findOne({username});
            if(isUser){
                return res.status(400).json({message: 'This user is already registered'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, password: hashPassword});
            await user.save();
            return res.json({message: 'Registration is successful'});
        } catch(e){
            res.status(400).json({message: 'Something went wrong'});
        }
    }

    async login(req, res){
        try{
            const { username } = req.body;
            const user = await User.findOne({username});
            if(!user){
                return res.status(400).json({message: `User ${username} is not found`})
            } 
            const token = generateAccessToken(user._id, user.username);
            return res.json({token})
        } catch(e){
            res.status(400).json({message: 'Login erorr'});
        }
    }

    async getUsers(req, res){
        try{
            const users = await User.find();
            res.json(users)
        } catch(e){
            res.status(400).json({message: 'Erorr'});
        }
    }
}

export default new authController();