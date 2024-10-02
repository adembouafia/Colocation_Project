import { Module } from '@nestjs/common';
import { AnnonceService } from './annonce.service';
import { AnnonceController } from './annonce.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaAnnonce } from './entities/annonce.entity';
import { MulterModule } from '@nestjs/platform-express';
import { SchemaCatagorie } from 'src/categorie/entities/categorie.entity';
import { SchemaColocation } from 'src/colocation/entities/colocation.entity';

@Module({
  imports : [MulterModule.register({dest:"./upload"}), MongooseModule.forFeature([{name:'annonce', schema : SchemaAnnonce},{name:'categorie',schema:SchemaCatagorie},{name:'Colocation', schema: SchemaColocation}])],
  controllers: [AnnonceController],
  providers: [AnnonceService],
})
export class AnnonceModule {}
