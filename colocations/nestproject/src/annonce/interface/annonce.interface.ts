import { Document } from "mongoose";
export interface Iannonce extends Document {
    readonly ref:number 
    readonly title:string
    readonly description:string
    readonly price:number
    readonly categorie:string
}