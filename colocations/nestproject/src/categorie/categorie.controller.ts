import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { error } from 'console';
import { ApiTags } from '@nestjs/swagger';
@ApiTags(' categories  ')
@Controller('categorie')  
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}
  @Post()
  async createCategorie(@Res() response , @Body() createCategorieDto:CreateCategorieDto) {
    try {
      const newCategorie = await this.categorieService.create(createCategorieDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Categorie has been created',
        newCategorie,
      });
    }
    catch(error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'error , categorie not created',
        error : 'Bad Request'
      })
    }
  }


  @Put('/:id')
  async updatedCategorie(@Res() response, @Param('id') categorieId : string, @Body() updateCategorieDto : UpdateCategorieDto){
    try {
      const updatedCategorie = await this.categorieService.updateCategorie(categorieId,updateCategorieDto);
      return response.status(HttpStatus.OK).json({
        message: 'Categorie has been updated',updatedCategorie,
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
async getCategorie (@Res() response){
  try {
    const categorie = await this.categorieService.getCategorie();
    return response.status(HttpStatus.OK).json({
      message : 'Categorie',
      categorie,
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
async getCategorieById(@Res() response, @Param('id') categorieId : string){
  try{
    const categorie = await this.categorieService.getCategorieById(categorieId);
    return response.status(HttpStatus.OK).json({
      message : 'Categorie : ',
      categorie
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
async deleteCategorieById(@Res() response, @Param('id') categorieId : string){
  try{
    const deletedcategorie = await this.categorieService.deleteCategorieById(categorieId);
    return response.status(HttpStatus.OK).json({
      message : 'Categorie deleted',deletedcategorie
      })
    }
  catch{
    return response.status(HttpStatus.BAD_REQUEST).json({
      message : 'error',
    })
  }


}
}
