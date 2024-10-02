import { Document } from "mongoose";
export interface Iuser extends Document{
    readonly name:string
    readonly email:string
    password:string
    readonly phone:number
    readonly ville:string
}