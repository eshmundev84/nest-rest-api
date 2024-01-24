import {IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @IsNumber()
    @IsNotEmpty()
    dni: number;

    @IsNumber()
    @IsNotEmpty()
    phoneNumber: number;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsBoolean()
    @IsOptional()
    active: boolean;
}