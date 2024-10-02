import { Injectable, NotFoundException } from '@nestjs/common';
import { Icolocation } from './interface/colocation.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateColocationDto } from './dto/create-colocation.dto';
import { UpdateColocationDto } from './dto/update-colocation.dto';
import { Iannonce } from 'src/annonce/interface/annonce.interface';

@Injectable()
export class ColocationService {
  constructor(@InjectModel('Colocation') private colocationModel:Model<Icolocation>,@InjectModel('Annonce') private annonceModel:Model<Iannonce>) {}
  async create(createColocationDto: CreateColocationDto) : Promise<Icolocation> {
    const newColocation = await new this.colocationModel(createColocationDto);
    const savedColocation = await newColocation.save();
    await this.annonceModel.findByIdAndUpdate(createColocationDto.annonce , {$push: {colocations:savedColocation._id}})
    return savedColocation;
}
async updateColocation(id:string ,updateColocationDto:UpdateColocationDto) : Promise<Icolocation> {
  const updatedcolocation = await this.colocationModel.findByIdAndUpdate(
    id,
    updateColocationDto, 
    {new : true} //bech ye5ou les données ejdodd
  );
  if (!updatedcolocation){
    throw new NotFoundException('Colocation not found');
  }
  return updatedcolocation ;
}
async getColocation() : Promise<Icolocation[]>{
  const getCat = await this.colocationModel.find().populate('contrat').populate('annonce','title')
  if (!getCat || getCat.length==0){
    throw new NotFoundException('table colocation empty');
  }
  return getCat;
}


async getColocationById(id:string) : Promise<Icolocation>{
  const getcolocation = await this.colocationModel.findById(id);
  if (!this.getColocationById){
    throw new NotFoundException('colocation mch mawjouda');
  }
  return getcolocation ; 
}



async deleteColocationById(id:string) : Promise<Icolocation> {
  const deletedcolocation = await this.colocationModel.findByIdAndDelete(id);
  if (!deletedcolocation){
    throw new NotFoundException('colocation not found');
 }
 return deletedcolocation
} 
}
