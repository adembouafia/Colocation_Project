import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
import { ContratService } from './contrat.service';
import { CreateContratDto } from './dto/create-contrat.dto';
import { UpdateContratDto } from './dto/update-contrat.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags(' Contrats  ')
@Controller('contrat')
export class ContratController {
  constructor(private readonly contratService: ContratService) {}

  @Post()
  async createContrat(@Res() response , @Body() createContratDto:CreateContratDto){
    try {
      const newContrat = await this.contratService.create(createContratDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Contrat has been created',
        newContrat,
      });
    }
    catch(error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'error , contrat not created',
        error : 'Bad Request'
      })
    }

  }
  @Put('/:id')
  async updatedContrat(@Res() response, @Param('id') contratId : string, @Body() updateContratDto : UpdateContratDto){
    try {
      const updatedContrat = await this.contratService.updateContrat(contratId,updateContratDto);
      return response.status(HttpStatus.OK).json({
        message: 'Contrat has been updated',updatedContrat,
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
async getContrat (@Res() response){
  try {
    const contrat = await this.contratService.getContrat();
    return response.status(HttpStatus.OK).json({
      message : 'Contrat',
      contrat,
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
async getContratById(@Res() response, @Param('id') contratId : string){
  try{
    const contrat = await this.contratService.getContratById(contratId);
    return response.status(HttpStatus.OK).json({
      message : 'Contrat : ',
      contrat
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
async deleteContratById(@Res() response, @Param('id') contratId : string){
  try{
    const deletedcontrat = await this.contratService.deleteContratById(contratId);
    return response.status(HttpStatus.OK).json({
      message : 'Contrat deleted',deletedcontrat
      })
    }
  catch{
    return response.status(HttpStatus.BAD_REQUEST).json({
      message : 'error',
    })
  }


}


}
