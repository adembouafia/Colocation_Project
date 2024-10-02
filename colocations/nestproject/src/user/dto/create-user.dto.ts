import { IsNumber, IsString, IsStrongPasswordOptions } from "class-validator"

export class CreateUserDto {
    @IsString()
    readonly name:string
    @IsString()
    readonly email:string
    @IsString()
    readonly password:string
    @IsNumber()
    readonly phone:number
    @IsString()
    readonly ville:string
    refreshToken: string;

}
