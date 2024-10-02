import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Put, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AnnonceService } from './annonce.service';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { Express } from 'multer'
@ApiTags(' annonces  ')
@Controller('annonce')
export class AnnonceController {
  constructor(private readonly annonceService: AnnonceService) {}
  @Post()

  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        ref:{type:"number"},
        title:{type:"string"},
        description:{type:"string"},
        price:{type:"number"},
        categorie:{type:"string"},
        files:{
          type:'array',
          items:{type:'string',format:"binary"}}
      },
    }
  })


  @UseInterceptors(
    FilesInterceptor("files", 10 ,{
      storage:diskStorage({
      destination:"./upload",
      filename:(require,file,callback)=>callback(null,`${new Date().getTime()}-${file.originalname}`)
    })})
  )


create (@Body() createAnnonceDto:CreateAnnonceDto,@UploadedFiles() files){
  createAnnonceDto.image=files.map(item=>item.filename)
  return this.annonceService.create(createAnnonceDto)
}
  async createAnnonce(@Res() response , @Body() createAnnonceDto:CreateAnnonceDto) {
    try {
      const newAnnonce = await this.annonceService.create(createAnnonceDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Annonce has been created',
        newAnnonce,
      });
    }
    catch(error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'error , annonce not created',
        error : 'Bad Request'
      })
    }
  }
  @Put('/:id')

  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        ref:{type:"number"},
        title:{type:"string"},
        description:{type:"string"},
        price:{type:"number"},
        files:{
          type:'array',
          items:{type:'string',format:"binary"}}
      },
    }
  })


  @UseInterceptors(
    FilesInterceptor("files", 10 ,{
      storage:diskStorage({
      destination:"./upload",
      filename:(require,file,callback)=>callback(null,`${new Date().getTime()}-${file.originalname}`)
    })})
  )
  
  async updatedAnnonce(@Res() response, @Param('id') annonceId : string, @Body() updateAnnonceDto : UpdateAnnonceDto,@UploadedFiles() files:Express.Multer.File[]){
    if (files && files.length > 0) {
      updateAnnonceDto.image = files.map(file => file.filename);
    }
    try {
      const updatedAnnonce = await this.annonceService.updateAnnonce(annonceId,updateAnnonceDto);
      return response.status(HttpStatus.OK).json({
        message: 'Annonce has been updated',updatedAnnonce,
      });
  }
  catch{
    return response.status(HttpStatus.BAD_REQUEST).json({
      message:'update error',
      error : 'bad request !'
    })
  }
}



@Get()
async getAnnonce (@Res() response){
  try {
    const annonce = await this.annonceService.getAnnonce();
    return response.status(HttpStatus.OK).json({
      message : 'Annonce',
      annonce,
    })
}
catch{
  return response.status(HttpStatus.BAD_REQUEST).json({
    message:'erreur',
    error : 'Bad request !'
  })
}
}




@Get("/:id")
async getAnnonceById(@Res() response, @Param('id') annonceId : string){
  try{
    const annonce = await this.annonceService.getAnnonceById(annonceId);
    return response.status(HttpStatus.OK).json({
      message : 'Annonce : ',
      annonce
    })
  }
  catch{
    return response.status(HttpStatus.BAD_REQUEST).json({
      message : 'error',
      error : 'errrreeeur !!!'
    })
  }
}


@Delete("/:id")
async deleteAnnonceById(@Res() response, @Param('id') annonceId : string){
  try{
    const deletedannonce = await this.annonceService.deleteAnnonceById(annonceId);
    return response.status(HttpStatus.OK).json({
      message : 'Annonce deleted',deletedannonce
      })
    }
  catch{
    return response.status(HttpStatus.BAD_REQUEST).json({
      message : 'error',
    })
  }


}
}
// function diskStorage(arg0: { destination: string; filename: (require: any, file: any, callback: any) => any; }): any {
//   throw new Error('Function not implemented.');
// }

