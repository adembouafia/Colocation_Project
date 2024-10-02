import { Prop, SchemaFactory , Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema()
export class Colocation {
    @Prop()
    typePaiement : string
    @Prop()
    avance : number
    @Prop({type:SchemaTypes.ObjectId,ref:"Annonce"})
    annonce : Types.ObjectId
    @Prop({type:SchemaTypes.ObjectId,ref:"Contrat"})
    contrat : Types.ObjectId

    
}
export const SchemaColocation = SchemaFactory.createForClass(Colocation)
