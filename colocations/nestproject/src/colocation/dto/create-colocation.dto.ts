import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateColocationDto {
    @IsString()
    @IsNotEmpty()
    readonly typePaiement : string 
    @IsNumber()
    @IsNotEmpty()
    readonly avance : number 
    @IsString()
    readonly annonce : string
}
