import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SchemaUser } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaAdmin } from 'src/admin/entities/admin.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: SchemaUser,discriminators:[{name:'Admin' , schema:SchemaAdmin}]}])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
