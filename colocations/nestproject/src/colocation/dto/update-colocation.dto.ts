import { PartialType } from '@nestjs/swagger';
import { CreateColocationDto } from './create-colocation.dto';

export class UpdateColocationDto extends PartialType(CreateColocationDto) {}
