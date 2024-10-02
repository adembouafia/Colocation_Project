import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { Annonce } from "src/annonce/entities/annonce.entity";

@Schema()
export class categorie {
    @Prop()
    name: string;
    @Prop()
    description: string;
    @Prop([{type:SchemaTypes.ObjectId,ref:"Annonce"}])
    annonces: Types.ObjectId[]

}
export const SchemaCatagorie = SchemaFactory.createForClass(categorie)
