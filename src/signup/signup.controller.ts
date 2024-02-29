import { Body, Controller, Post } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupDto } from './signup.dto';
import { loginDto } from './login.dto';

@Controller() //http://localhost:8000/signup
export class SignupController {
    constructor(
        private readonly signupService: SignupService
    ) {}
    @Post('/signup')
    signup(@Body() signupDto: SignupDto) {
        return this.signupService.signup(signupDto)
    }

    @Post('/login')
    login(@Body() loginDto: loginDto) {
        return this.signupService.login(loginDto)
    }
}
