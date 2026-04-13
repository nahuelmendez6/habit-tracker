import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}


    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        // inside the login function, it first checks
        // for the user. It uses the authService.validateUser
        // to check if that user exists
        const user = await this.authService.validateUser(
            dto.email,
            dto.password
        );
        // with the user object, then login acces to authService.login
        return this.authService.login(user);
    }
}