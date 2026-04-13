/**
 * Our AuthService has the job of retreiving a user and verifying the password
 */

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/users/users.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    // we inject the user service
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    // split the auth functionalities into two different functions:
    // - validateUser -> searchs for an user and verify password
    // - login -> build the payload and sign the jwt

    async validateUser(email: string, password: string): Promise<any> {
        // use the findOne method to search user by email
        const user = await this.userService.findByEmail(email);

        if (!user) throw new UnauthorizedException('User not found');

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

        return user;

    }

    async login(user: any) {
        const payload = {
            sub: user.id,
            email: user.email
        };

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}