import { IsString,IsNotEmpty,MinLength,IsEmail } from "class-validator";

export class SignUpUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    username : string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)

    password : string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email : string;
}