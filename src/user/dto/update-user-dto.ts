import { IsEmail,IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    @MinLength(5)
    @IsString()
    username ? : string;

    @IsEmail()
    email ? : string;
}