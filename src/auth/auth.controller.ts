import { Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/rol.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from '../common/enums/rol.enums';
import {Auth} from './decorators/auth.decorators'



interface RequestWithUser extends Request{
    user:{
        email: string
        rol: string
    }
}

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}
    @Post('register')
    register(@Body() registerdto : RegisterDto){
        return this.authService.register(registerdto);
    }

    @Post('login',)
    login(@Body() loginDto : LoginDto){
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @Auth(Role.ADMIN)
    profile(@Req() req : RequestWithUser){
        return req.user
    }
}
  