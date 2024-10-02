import { IsNumber, IsString } from "class-validator";

export class CreateContratDto {
    @IsNumber()
    readonly ref : number
    @IsString()
    readonly description : string 
    @IsNumber()
    readonly remise : number 
    @IsString()
    readonly colocation : string
}
