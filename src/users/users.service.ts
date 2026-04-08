import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateUserDto } from "./dto/create-user.dto";

import bcrypt from "bcrypt";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });

        return this.userRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email }});
    }
}