import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';
import { Iannonce } from './interface/annonce.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Icategorie } from 'src/categorie/interface/categorie.interface';
import { Annonce } from './entities/annonce.entity';

@Injectable()
export class AnnonceService {
  constructor(@InjectModel('annonce') private annonceModel:Model<Iannonce>,@InjectModel('categorie') private categorieModel:Model<Icategorie>) {}

  
  async create(createAnnonceDto: CreateAnnonceDto) : Promise<Iannonce> {
    const newAnnonce = await new this.annonceModel(createAnnonceDto);
    const savedAnnonce = await newAnnonce.save();
    await this.categorieModel.findByIdAndUpdate(createAnnonceDto.categorie , {$push: {annonces:savedAnnonce._id}})
    return savedAnnonce
  }
  async updateAnnonce(id:string ,updateAnnonceDto:UpdateAnnonceDto) : Promise<Iannonce> {
    const updatedannonce = await this.annonceModel.findByIdAndUpdate(
      id,
      updateAnnonceDto, 
      {new : true} //bech ye5ou les données ejdodd
    );
    if (!updatedannonce){
      throw new NotFoundException('Annonce not found');
    }
    return updatedannonce ;
  }


  async getAnnonce() : Promise<Iannonce[]>{
    const getCol = await this.annonceModel.find().populate('colocations');
    if (!getCol || getCol.length==0){
      throw new NotFoundException('table annonce empty');
    }
    return getCol;
  }


  async getAnnonceById(id:string) : Promise<Iannonce>{
    const getannonce = await this.annonceModel.findById(id);
    if (!this.getAnnonceById){
      throw new NotFoundException('annonce mch mawjouda');
    }
    return getannonce ; 
  }



  async deleteAnnonceById(id:string) : Promise<Iannonce> {
    const deletedannonce = await this.annonceModel.findByIdAndDelete(id);
    if (!deletedannonce){
      throw new NotFoundException('annonce not found');
   }
   return deletedannonce
} 

}
