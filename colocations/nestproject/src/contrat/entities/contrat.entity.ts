import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema()
export class Contrat {
    @Prop()
    ref : number
    @Prop()
    description:string
    @Prop()
    remise:number
    @Prop({type:SchemaTypes.ObjectId,ref:"Colocation"})
    colocation : Types.ObjectId
}
export const SchemaContrat = SchemaFactory.createForClass(Contrat)
