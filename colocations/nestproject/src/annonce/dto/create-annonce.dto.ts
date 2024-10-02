import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateAnnonceDto {
    @Type(() => Number)
    readonly ref:number
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    readonly title:string
    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    readonly description:string
    @ApiProperty({type:Array})
    image:string[]
    @Type(() => Number)
    readonly price:number
    @IsString()
    readonly categorie:string
}
