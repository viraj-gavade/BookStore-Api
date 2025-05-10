import { IsEmail,IsString, MinLength } from "class-validator";

/**
 * Data Transfer Object for updating user profile information
 * Contains optional validated fields for profile updates
 */
export class UpdateUserDto {
    /**
     * User's new username
     * Must be at least 5 characters if provided
     */
    @MinLength(5)
    @IsString()
    username ? : string;

    /**
     * User's new email address
     * Must be a valid email format if provided
     */
    @IsEmail()
    email ? : string;
}