import { PartialType } from '@nestjs/mapped-types';
import { CreateCategorieDto } from './create-categorie.dto';

export class UpdateCategorieDto extends PartialType(CreateCategorieDto) {
  id(id: any, updateCategorieDto: UpdateCategorieDto) {
    throw new Error('Method not implemented.');
  }
}
