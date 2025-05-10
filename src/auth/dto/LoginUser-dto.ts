import { IsString,IsNotEmpty } from "class-validator";

/**
 * Data Transfer Object (DTO) for user login
 * Contains validated user credentials
 */
export class LoginUserDto {
    /**
     * Email address used for login
     * Must not be empty
     */
    @IsString()
    @IsNotEmpty()
    email:string;

    /**
     * User password for authentication
     * Must not be empty
     */
    @IsString()
    @IsNotEmpty()
    password:string
}