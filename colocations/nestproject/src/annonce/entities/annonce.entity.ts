import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { SchemaTypes, Types } from "mongoose"

@Schema()
export class Annonce {
    @Prop()
    ref : number 
    @Prop()
    title : string
    @Prop()
    description : string
    @Prop()
    image : string[]
    @Prop()
    price : number
    @Prop({type:SchemaTypes.ObjectId,ref:"categorie"})
    categorie : Types.ObjectId
    @Prop({type:SchemaTypes.ObjectId,ref:"Colocation"})
    colocations : Types.ObjectId

}
export const SchemaAnnonce = SchemaFactory.createForClass(Annonce);