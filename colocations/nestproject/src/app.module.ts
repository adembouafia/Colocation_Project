import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorieModule } from './categorie/categorie.module';
import { AnnonceModule } from './annonce/annonce.module';
import { ColocationModule } from './colocation/colocation.module';
import { ContratModule } from './contrat/contrat.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'colocation'}),    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'upload'),
    serveRoot: '/upload',
  }), CategorieModule, AnnonceModule, ColocationModule, ContratModule, UserModule, AdminModule, AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
