import { IsEmail, IsString } from "class-validator"
import { Transform } from "class-transformer";


export class LoginDto {

    @IsEmail()
    Email: string

    @Transform(({value}) => value.trim())
    @IsString()
    Password: string
}