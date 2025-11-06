import {BadRequestException, Injectable, Req} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {CreateUserDto} from "../user/dto/create-user.dto.js";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service.js";

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService,
                private readonly  cfg: ConfigService,) {}


    async createToken(email: string, age:number): Promise<{access_token: string}> {

        const token = await this.jwtService.signAsync({ email, age}, {
            secret: this.cfg.get('JWT_SECRET')
        });
        return { access_token: token };

    }
    async getToken(token: string): Promise<{ email: string; age: number; }> {
        const decodedToken = await this.jwtService.decode(token);
        if (!decodedToken) {
            throw new BadRequestException("Failed to decode jwt token")
        }
        return decodedToken;

    }


}
