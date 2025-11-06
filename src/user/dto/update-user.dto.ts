import { PartialType } from '@nestjs/mapped-types';
import {CreateUserDto} from "./create-user.dto.js";
import {IsEmail, IsInt, IsNotEmpty, Max, Min} from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsNotEmpty()
    @IsEmail()
    email?: string;
    @IsNotEmpty()
    password?: string;
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(150)
    age?: number;

}
