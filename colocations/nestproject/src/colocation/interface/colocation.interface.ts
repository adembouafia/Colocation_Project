import { Document } from 'mongoose'
import { Annonce } from 'src/annonce/entities/annonce.entity'
export interface Icolocation extends Document{
    readonly typePaiement : string
    readonly avance : number 
    readonly annonce : Annonce
}