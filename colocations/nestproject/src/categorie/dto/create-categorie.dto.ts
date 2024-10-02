import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCategorieDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(23)
    readonly name : string 
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    readonly description : string 
}
