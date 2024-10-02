import { Module } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieController } from './categorie.controller';
import { SchemaCatagorie } from './entities/categorie.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaAnnonce } from 'src/annonce/entities/annonce.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'categorie', schema: SchemaCatagorie },{name:'Annonce', schema: SchemaAnnonce}])],
  controllers: [CategorieController],
  providers: [CategorieService],
})
export class CategorieModule {}
