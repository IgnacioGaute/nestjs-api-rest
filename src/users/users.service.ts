import { Injectable, ConflictException, UnauthorizedException  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
   private readonly userRepository:Repository<User>,
   private readonly jwtService: JwtService,
  ){}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    const existingUser = await this.userRepository.findOne({ where: { Email: createUserDto.Email } });
        //    const existingUser = await this.userRepository.findOneBy({ Email: createUserDto.Email } );
    if(existingUser){
      throw new ConflictException('Email already exists');
    }
    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({id});
    if(!user){
      throw new ConflictException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({id});
    if(!user){
      throw new ConflictException('User not found');
    }
    const existingUser = await this.userRepository.findOne({ where: { Email: updateUserDto.Email } });
    if(existingUser){
      throw new ConflictException('Email already exists');
    }
    await this.userRepository.update(id, updateUserDto)
    return { message: `User with ID ${id} has been updated` };

  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({id});
    if(!user){
      throw new ConflictException('User not found');
    }
      await this.userRepository.softDelete({id})
      return { message: `User with ID ${id} has been delete` };
  }


  async login(loginDto : LoginDto) {

    const existingUser = await this.userRepository.findOne({ where: { Email: loginDto.Email } });
    if(!existingUser){
      throw new UnauthorizedException('Email or Password incorrect');
    }
    const areEqual = await bcryptjs.compare(loginDto.Password, existingUser.Password);
    if(!areEqual){
      throw new ConflictException('Password incorrect');
    }

    const payload = { email: existingUser.Email, rol: existingUser.rol};
    const accessToken = await this.jwtService.signAsync(payload);

    return { 
      accessToken,
      message: `User Login` 
    };

  }
}



