import { IsString,IsNotEmpty,MinLength,IsEmail } from "class-validator";

/**
 * Data Transfer Object (DTO) for user registration
 * Contains validated user signup information fields
 */
export class SignUpUserDto {
    /**
     * Username for the new account
     * Must be a string with minimum length of 5 characters
     */
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    username : string;

    /**
     * Password for the account
     * Must be a string with minimum length of 8 characters
     */
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password : string;

    /**
     * User email address
     * Must be a valid email format
     */
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email : string;
}