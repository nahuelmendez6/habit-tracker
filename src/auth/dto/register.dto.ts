import { IsEmail, IsNotEmpty, Min, MinLength } from 'class-validator'

export class RegisterDto {
    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string

    @MinLength(5)
    password: string
}