import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service'
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs'

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService){}

    async register(registerDto : RegisterDto){
        return await this.usersService.create({
            ...registerDto,
            Password: await bcryptjs.hash(registerDto.Password, 10)
        })
    }

    async login(loginDto : LoginDto ){
        return await this.usersService.login(loginDto)
    }
}
