import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * JWT authentication strategy implementation
 * Extends Passport's strategy for JWT token validation
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    /**
     * Constructor configures the JWT strategy settings
     * Sets up token extraction from Authorization header and verification key
     */
    constructor() {
        super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header
                secretOrKey : process.env.SECRET_KEY, // Use environment variable for JWT secret key
            });
    }

    /**
     * Validates the JWT payload after token is verified
     * @param payload - Decoded JWT payload containing user information
     * @returns Object with user data to be attached to the request object
     */
    async validate(payload:any){
       return { userId : payload.UserId , username : payload.username }
    }
}