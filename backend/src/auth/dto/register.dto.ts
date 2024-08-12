import { IsEmail, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString({ message: "Name must be a string" })
  name: string;

  @Transform(({ value }) => value.trim())
  @IsEmail({}, { message: "Email must be an email" })
  email: string;

  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @Transform(({ value }) => value.trim())
  @IsString({ message: "Password must be a string" })
  password: string;
}