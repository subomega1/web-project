import User from "../models/User.model.js";
import bcrypt from "bcryptjs"



export const signup = async (req, res) => {

    try {
        const { name, email, password , confirmPassword, isAdmin } = req.body
        if (!name || !email || !password || !confirmPassword || !isAdmin) {
            return res.status(400).json({ error: "All fields are required" })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ error: "User already exists" })
        }
        if(password !== confirmPassword){
            return res.status(400).json({ error: "Passwords do not match" }) 
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            isAdmin
        })
        if(newUser){

            await newUser.save()
            res.status(201).json({ message: "User created successfully",
             user: {
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin
            }
             })


        }else{
            res.status(400).json({ error: "Invalid user data" })
        }

        
    } catch (error) {
        console.log("could not create user", error.message);
        res.status(500).json({ error: "Internal server error" })

        
    }

}
export const login = (req, res) => {

    //check the user credentials note you need to encrypt the password
    //exception handling

   
    //generate token
    // user info name role 
}
export const logout = (req, res) => {
    
    //clear the cookie

}