import User from "./models/User.js";
import { validationResult } from "express-validator";

class authController {
    async register(req, res){
        try{
            const erorrs = validationResult(req);
            if(!erorrs.isEmpty()){
                return res.status(400).json({message: "Registration error", erorrs})
            }
            const { username } = req.body;
            const isUser = await User.findOne({username});
            if(isUser){
                return res.status(400).json({message: 'This user is already register'})
            }
            const user = new User({username});
            await user.save();
            return res.json({message: 'Registration was successful'});
        } catch(e){
            res.status(400).json({message: 'Something went wrong'});
        }
    }

    async login(req, res){
        try{
            const { username } = req.body;
            const user = await User.findOne({username});
            if(!user){
                return res.status(400).json({message: `User ${username} is not find`})
            } 
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