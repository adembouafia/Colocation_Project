import { Module } from '@nestjs/common';
import { ContratService } from './contrat.service';
import { ContratController } from './contrat.controller';
import { SchemaColocation } from 'src/colocation/entities/colocation.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaContrat } from './entities/contrat.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Contrat', schema: SchemaContrat } , {name:'Colocation',schema : SchemaColocation}])],
  controllers: [ContratController],
  providers: [ContratService],
})
export class ContratModule {}
