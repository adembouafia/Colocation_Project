import { PartialType } from '@nestjs/swagger';
import { CreateAnnonceDto } from './create-annonce.dto';

export class UpdateAnnonceDto extends PartialType(CreateAnnonceDto) {}
