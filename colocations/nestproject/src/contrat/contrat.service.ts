import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContratDto } from './dto/create-contrat.dto';
import { UpdateContratDto } from './dto/update-contrat.dto';
import { Icontrat } from './interface/contrat.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Icolocation } from 'src/colocation/interface/colocation.interface';

@Injectable()
export class ContratService {
  constructor(@InjectModel('Contrat') private contratModel:Model<Icontrat>,@InjectModel('Colocation') private colocationModel:Model<Icolocation>) {}
  async create(createContratDto: CreateContratDto) : Promise<Icontrat> {
    const newContrat = await new this.contratModel(createContratDto);
    const savedContrat = await newContrat.save()
    await this.colocationModel.findByIdAndUpdate(createContratDto.colocation , {$push : {contrat:savedContrat._id}})
    return savedContrat
}
async updateContrat(id:string ,updateContratDto:UpdateContratDto) : Promise<Icontrat> {
  const updatedcontrat = await this.contratModel.findByIdAndUpdate(
    id,
    updateContratDto, 
    {new : true} //bech ye5ou les données ejdodd
  );
  if (!updatedcontrat){
    throw new NotFoundException('Contrat not found');
  }
  return updatedcontrat ;
}
async getContrat() : Promise<Icontrat[]>{
  const getCat = await this.contratModel.find()
  if (!getCat || getCat.length==0){
    throw new NotFoundException('table contrat empty');
  }
  return getCat;
}


async getContratById(id:string) : Promise<Icontrat>{
  const getcontrat = await this.contratModel.findById(id);
  if (!this.getContratById){
    throw new NotFoundException('contrat mch mawjouda');
  }
  return getcontrat ; 
}



async deleteContratById(id:string) : Promise<Icontrat> {
  const deletedcontrat = await this.contratModel.findByIdAndDelete(id);
  if (!deletedcontrat){
    throw new NotFoundException('contrat not found');
 }
 return deletedcontrat
} 
}
