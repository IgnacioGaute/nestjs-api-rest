import { IsEmail, IsString } from "class-validator"
import { Transform } from "class-transformer";


export class CreateUserDto {

    @Transform(({value}) => value.trim())
    @IsString()
    name: string


    email: string

    @Transform(({value}) => value.trim())

    password: string
}
