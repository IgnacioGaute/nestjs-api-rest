import { IsEmail, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class RegisterDto{

    @Transform(({value}) => value.trim())
    @IsString()
    Name: string;

    @IsEmail()
    Email: string;

    @IsString()
    @Transform(({value}) => value.trim())
    Password: string;
}