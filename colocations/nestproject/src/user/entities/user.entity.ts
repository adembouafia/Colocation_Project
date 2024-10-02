import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type UserDocument = User & Document;

@Schema({ discriminatorKey: "items" })
export class User {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    phone: number;

    @Prop()
    ville: string;
    @Prop()
    refreshToken:string
}

export const SchemaUser = SchemaFactory.createForClass(User);


//EDHEYA METHODE 1 MTAA CRYPTAGE PASSWORD , ESTAAMALNA EL bcrypt ELI IMPORTINEH L FOU9
// SchemaUser.pre<UserDocument>('save', async function (next) {
//     if (this.isModified('password') || this.isNew) {
//         const hashedPassword = await bcrypt.hash(this.password, 10);
//         this.password = hashedPassword;
//     }
//     next();
// });



//EDHEYA METHODE 2 MTAA CRYPTAGE PLUS FACILE AMA A9AL SECURITEE , JUST TAAWADH EL HROUF MTAA L PWD B #
// SchemaUser.pre<UserDocument>('save', function (next) {
//     if (this.isModified('password') || this.isNew) {
//         this.password = '#'.repeat(this.password.length);
//     }
//     next();
// });

// W AHNA 9AADIN NSTAAMLOU F METHODE OKHRA MWJOUDA FL ADMIN.SERVICE