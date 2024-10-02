import { PartialType } from '@nestjs/swagger';
import { CreateContratDto } from './create-contrat.dto';

export class UpdateContratDto extends PartialType(CreateContratDto) {}
