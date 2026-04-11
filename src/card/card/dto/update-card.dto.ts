import { PartialType } from '@nestjs/mapped-types';
import { buyCardDto } from './buy-card.dto';

export class UpdateCardDto extends PartialType(buyCardDto) {}
