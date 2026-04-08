import { IsEmail, IsNotEmpty, Min, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    lastname: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
