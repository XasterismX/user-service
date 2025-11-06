import {IsEmail, IsInt, IsNotEmpty, Max, Min} from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(150)
    age: number;


}
