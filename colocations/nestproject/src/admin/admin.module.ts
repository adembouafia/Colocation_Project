import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaUser } from 'src/user/entities/user.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:'User' , schema:SchemaUser}])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
