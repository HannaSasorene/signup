import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignupModel } from './signup.model';
import { Model } from "mongoose"
import * as bcrypt from 'bcrypt'
import { loginDto } from './login.dto';

interface User {
    username: String,
    email: String,
    password: String
}

@Injectable()
export class SignupService {
    constructor(
        @InjectModel("Signup") private signupModel: Model<SignupModel>
    ) { }

    async signup(user: User) {
        const newUser = new this.signupModel({
            username: user.username,
            email: user.email,
            password: await bcrypt.hash(user.password, 10)
        })
        try {
            await newUser.save()
            return {
                "status": "success"
            }
        }
        catch (error) {
            console.log(error)
            return {
                "status": "failed"
            }
        }
    }


    async login(creadential: loginDto) {
        const validuser = await this.signupModel.findOne({
            email: creadential.email
        })

        if (!validuser) {
            return { "status": "failed", "error": "not found" };
        }
        const validpassword = await bcrypt.compare(creadential.password, validuser.password)

        if (!validpassword) {
            return { "status": "failed", "error": "invalid password" };
        }

        return { "status": "success", "message": "Login successfully", "user": validuser.username }
    }
}