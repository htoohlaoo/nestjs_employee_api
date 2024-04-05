import { IsString,IsEmpty,IsEnum, IsEmail, IsNumber } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmpty()
    name:string;

    @IsEmail()
    email:string;
    
    @IsNumber()
    age:number;

    @IsEnum(["INTERN","ADMIN","ENGINEER"])
    role:"INTERN"|"ADMIN"|"ENGINEER"
}

