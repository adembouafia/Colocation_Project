import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UserDocument } from './entities/user.entity';
import { Iuser } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel:Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) : Promise<UserDocument> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
}
async updateUser(id:string ,updateUserDto:UpdateUserDto) : Promise<UserDocument> {
  const updateduser = await this.userModel.findByIdAndUpdate(
    id,
    updateUserDto, 
    {new : true} //bech ye5ou les données ejdodd
  );
  if (!updateduser){
    throw new NotFoundException('User not found');
  }
  return updateduser ;
}

async updateToken(userId: any, token: string): Promise<Iuser> {
  return this.userModel.findByIdAndUpdate(userId, { token }, { new: true }).exec();
}


async getUser() : Promise<UserDocument[]>{
  const getUs = await this.userModel.find()
  if (!getUs || getUs.length==0){
    throw new NotFoundException('table user empty');
  }
  return getUs;
}


async getUserById(id:string) : Promise<UserDocument>{
  const getuser = await this.userModel.findById(id);
  if (!this.getUserById){
    throw new NotFoundException('user mch mawjouda');
  }
  return getuser ; 
}

async getUserByEmail(email:string) : Promise<UserDocument>{
  const getuserbyEmail = await this.userModel.findOne({email})
  if (!this.getUserByEmail){
    throw new NotFoundException('email mch mawjouda');
  }
  return getuserbyEmail ; 
}


async deleteUserById(id:string) : Promise<UserDocument> {
  const deleteduser = await this.userModel.findByIdAndDelete(id);
  if (!deleteduser){
    throw new NotFoundException('user not found');
 }
 return deleteduser
} 

async findOne(filter:any): Promise<UserDocument | null>{
  return this.userModel.findOne(filter).exec();
}
}
