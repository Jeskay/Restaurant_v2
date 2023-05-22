import { IsDefined, IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UserDto {
    @IsDefined()
    @IsEmail()
    @IsString()
    email!: string;

    @IsDefined()
    @IsString()
    @MinLength(5)
    password!: string;

    @IsOptional()
    @IsString()
    name?: string;
}