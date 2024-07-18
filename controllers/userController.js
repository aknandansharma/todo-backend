import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// Register User 
export const registerUser = async (req, res) => {
    try {
        const {fullName, email, password} = req.body;

        if(!fullName) {
            return res.status(400).json({error: true, message: "FullName is required!"})
        }
        if(!email) {
            return res.status(400).json({error: true, message: "Email is required!"})
        }
        if(!password) {
            return res.status(400).json({error: true, message: "Password is required!"})
        }

        const isUser = await User.findOne({email: email});
        if(isUser) {
            return res.json({
                error: true,
                message: "User already exist",
            })
        }

        const hashPassword = await bcrypt.hash(password, 10); 
        const user = new User({
            fullName,
            email,
            password:hashPassword,
        })

        await user.save();

        const accessToken = jwt.sign({user}, process.env.JWT_SECRET, {
            expiresIn: "30m",
        });

        return res.json({
            error: false,
            user,
            accessToken,
            message: "User Register Successfully!"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in register user..",
        });
    }
}


// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: true, message: "Email is required!" });
        }
        if (!password) {
            return res.status(400).json({ error: true, message: "Password is required!" });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: true, message: "User does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: true, message: "Invalid Email or Password" });
        }

        const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "30m",
        });

        return res.json({
            error: false,
            user,
            accessToken,
            message: "Login successful!"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in logging in user..",
        });
    }
}
