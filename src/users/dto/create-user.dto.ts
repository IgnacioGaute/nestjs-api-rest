import { IsEmail, IsString } from "class-validator"
import { Transform } from "class-transformer";


export class CreateUserDto {

    @Transform(({value}) => value.trim())
    @IsString()
    Name: string

    @IsEmail()
    Email: string

    @Transform(({value}) => value.trim())
    @IsString()
    Password: string
}
