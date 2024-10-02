import { Document } from "mongoose";
import { Colocation } from "src/colocation/entities/colocation.entity";
export interface Icontrat extends Document {
    readonly ref : number
    readonly description : string 
    readonly remise : number
    readonly colocation : Colocation
}