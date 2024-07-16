
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateSensorDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly latitude: number;

  @IsNumber()
  readonly longitude: number;
}
