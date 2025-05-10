import { IsString,IsNotEmpty } from "class-validator";

/**
 * Data Transfer Object for changing user password
 * Contains validated old and new password fields
 */
export class ChangePasswordDto {
    /**
     * User's current password for verification
     * Must not be empty
     */
    @IsString()
    @IsNotEmpty()
    oldPassword: string;

    /**
     * User's new password to set
     * Must not be empty
     */
    @IsString()
    @IsNotEmpty()
    newPassword: string;
}