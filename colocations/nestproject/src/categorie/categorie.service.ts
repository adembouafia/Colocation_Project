import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { categorie } from './entities/categorie.entity';
import { Icategorie } from './interface/categorie.interface';
import { Model } from 'mongoose';

@Injectable()
export class CategorieService {
  constructor(@InjectModel('categorie') private categorieModel:Model<Icategorie>) {}

  
  async create(createCategorieDto: CreateCategorieDto) : Promise<Icategorie> {
    const newCategorie = await new this.categorieModel(createCategorieDto);
    return newCategorie.save();
  }


  async updateCategorie(id:string ,updateCategorieDto:UpdateCategorieDto) : Promise<Icategorie> {
    const updatedcategorie = await this.categorieModel.findByIdAndUpdate(
      id,
      updateCategorieDto, 
      {new : true} //bech ye5ou les données ejdodd
    );
    if (!updatedcategorie){
      throw new NotFoundException('Categorie not found');
    }
    return updatedcategorie ;
  }


  async getCategorie() : Promise<Icategorie[]>{
    const getCat = await this.categorieModel.find().populate('annonces');
    if (!getCat || getCat.length==0){
      throw new NotFoundException('table categorie empty');
    }
    return getCat;
  }


  async getCategorieById(id:string) : Promise<Icategorie>{
    const getcategorie = await this.categorieModel.findById(id);
    if (!this.getCategorieById){
      throw new NotFoundException('categorie mch mawjouda');
    }
    return getcategorie ; 
  }



  async deleteCategorieById(id:string) : Promise<Icategorie> {
    const deletedcategorie = await this.categorieModel.findByIdAndDelete(id);
    if (!deletedcategorie){
      throw new NotFoundException('categorie not found');
   }
   return deletedcategorie
} 
}
