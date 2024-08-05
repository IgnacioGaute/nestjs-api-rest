import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constant';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>("JWT_SECRET"),
      signOptions: { expiresIn: "1d" },
      global: true,
    }),
    inject: [ConfigService],
  }),
   // JwtModule.register({
     // global: true ,
     // secret: jwtConstants.secret,
     // signOptions: { expiresIn: '1d' }
   // }),
   ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, JwtModule]
})
export class UsersModule {}
