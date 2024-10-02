import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Iadmin } from './interface/admin.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as argon2 from 'argon2';
import { UpdatePasswordDto } from './dto/update-pass.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel('User') private adminModel:Model<Iadmin>) {}

//EDHEYA KEN ESTAAMALT WAHDA MEL LES METHODES ELI MWJOUD FL USER.ENTITY 
//   async create(createAdminDto: CreateAdminDto) : Promise<Iadmin> {
//     const newAdmin = await new this.adminModel(createAdminDto);
//     return newAdmin.save();
// }

//Hedhya el methode 3 eli 9aadin nstaamlou feha tw  : 
async create(createAdminDto: CreateAdminDto): Promise<Iadmin> {
  const hash=await this.hashData(createAdminDto.password);
   const newAdmin = await new this.adminModel({...createAdminDto,password:hash});
   return newAdmin.save();
}
hashData(data: string) {
  return argon2.hash(data);
}
async updatePassword(adminId: string, updatePasswordDto: UpdatePasswordDto): Promise<void> {
  const { oldPassword, newPassword } = updatePasswordDto;
  const admin = await this.adminModel.findById(adminId);
  if (!admin) {
    throw new BadRequestException('Admin not found');
  }
  const isOldPasswordValid = await argon2.verify(admin.password, oldPassword);
  if (!isOldPasswordValid) {
    throw new BadRequestException('Old password is incorrect');
  }
  const newHashedPassword = await this.hashData(newPassword);
  admin.password = newHashedPassword;
  await admin.save();
}
}

