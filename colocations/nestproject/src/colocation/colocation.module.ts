import { Module } from '@nestjs/common';
import { ColocationService } from './colocation.service';
import { ColocationController } from './colocation.controller';
import { SchemaColocation } from './entities/colocation.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaAnnonce } from 'src/annonce/entities/annonce.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Colocation', schema: SchemaColocation },{name:'Annonce', schema: SchemaAnnonce}])],
  controllers: [ColocationController],
  providers: [ColocationService],
})
export class ColocationModule {}
