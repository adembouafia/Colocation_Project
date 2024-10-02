import { Document } from 'mongoose' ; 
export interface Icategorie extends Document{
    readonly name : string ; 
    readonly description : string ;
}