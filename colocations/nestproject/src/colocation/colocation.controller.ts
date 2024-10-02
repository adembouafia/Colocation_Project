import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { ColocationService } from './colocation.service';
import { CreateColocationDto } from './dto/create-colocation.dto';
import { UpdateColocationDto } from './dto/update-colocation.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags(' Colocations  ')
@Controller('colocation')
export class ColocationController {
  constructor(private readonly colocationService: ColocationService) {}

  @Post()
  async createColocation(@Res() response , @Body() createColocationDto:CreateColocationDto){
    try {
      const newColocation = await this.colocationService.create(createColocationDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Colocation has been created',
        newColocation,
      });
    }
    catch(error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'error , colocation not created',
        error : 'Bad Request'
      })
    }

  }
  @Put('/:id')
  async updatedColocation(@Res() response, @Param('id') colocationId : string, @Body() updateColocationDto : UpdateColocationDto){
    try {
      const updatedColocation = await this.colocationService.updateColocation(colocationId,updateColocationDto);
      return response.status(HttpStatus.OK).json({
        message: 'Colocation has been updated',updatedColocation,
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
async getColocation (@Res() response){
  try {
    const colocation = await this.colocationService.getColocation();
    return response.status(HttpStatus.OK).json({
      message : 'Colocation',
      colocation,
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
async getColocationById(@Res() response, @Param('id') colocationId : string){
  try{
    const colocation = await this.colocationService.getColocationById(colocationId);
    return response.status(HttpStatus.OK).json({
      message : 'Colocation : ',
      colocation
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
async deleteColocationById(@Res() response, @Param('id') colocationId : string){
  try{
    const deletedcolocation = await this.colocationService.deleteColocationById(colocationId);
    return response.status(HttpStatus.OK).json({
      message : 'Colocation deleted',deletedcolocation
      })
    }
  catch{
    return response.status(HttpStatus.BAD_REQUEST).json({
      message : 'error',
    })
  }


}

}
