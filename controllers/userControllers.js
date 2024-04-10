import User from '../Model/userModel.js'  // Importing the User model/schema
import { generateAccessToken } from './../authentication/userAuth.js';
import { v2 as cloudinary } from 'cloudinary';
import nodemailer from 'nodemailer'



cloudinary.config({
    cloud_name: 'dszbafvap',
    api_key: '996742774252596',
    api_secret: '9YNJSPW9wTgOJ464sdmM68Ti4uo'
});



export const registerController = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(202).send({
                success: false,
                message: 'Username or email already exists'
            });
        }

        // Create a new user instance
        const newUser = new User({
            name,
            username,
            email,
            password
        });

        const Token = generateAccessToken(username)

        // Save the new user to the database
        await newUser.save();



        // Return success response
        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            email,
            Token
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};



export const userAuth = (req, res) => {

    res.json({
        success: true,
        message: 'User authenticated successfully',

    });

}



export const uploadImageController = (req, res) => {
    try {
        const { image } = req.body
        cloudinary.uploader.upload(image,
            { public_id: "profile_Picture" },
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).send({
                        success: false,
                        message: "Failed to upload image"
                    });
                } else {
                    res.status(201).send({
                        success: true,
                        message: "Image uploaded successfully",
                        data: result
                    });
                }
            });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "An error occurred while uploading image"
        });
    }
}

export const verificationEmail = async (req, res) => {
    try {
        const { token } = req.body

        const htmlContentWithHeader = `<a href="http://localhost:4000/userAuth/${token}">Click here to verify your email</a>`;
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.FROM_EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });



        await transporter.sendMail({
            from: '<9shad.test@gmail.com>',
            to: 'nowshadsabapathi@gmail.com',
            subject: `Dear Verify Your Email`,
            html: htmlContentWithHeader

        });
        res.status(200).send({
            success: true,
            message: "Email Sent SuccessFully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: error
        })
    }
}