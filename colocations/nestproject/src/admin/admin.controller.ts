import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePasswordDto } from './dto/update-pass.dto';
@ApiTags('Admins')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post()
  async createAdmin(@Res() response , @Body() createAdminDto:CreateAdminDto){
    try {
      const newAdmin = await this.adminService.create(createAdminDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Admin has been created',
        newAdmin,
      });
    }
    catch(error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'error , admin not created',
        error : 'Bad Request'
      })
    }

  }
  @Put('/:id')
  async updatePassword(@Res() response, @Param('id') id: string, @Body () updatePasswordDto:UpdatePasswordDto){
    try {
      const updatedadmin = await this.adminService.updatePassword(id, updatePasswordDto);
      return response.status(HttpStatus.OK).json({
        message: 'Admin password has been updated',
        updatedadmin,
        });
        }
    catch(error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'error , admin password not updated',
        error : 'Bad Request'
        })
        }
      }}

