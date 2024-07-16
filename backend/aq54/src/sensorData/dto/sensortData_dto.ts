import { IsNumber, IsDate, IsString } from 'class-validator';


export class CreateSensorDataDto {
  @IsString()
  readonly station_name: string;

  @IsNumber()
  readonly station_lat: number;

  @IsNumber()
  readonly station_lon: number;


  @IsDate()
  readonly timestamp: Date;

  @IsNumber()
  readonly CO: number;


  @IsNumber()
  readonly NO2: number;

  @IsNumber()
  readonly O3: number;

  @IsNumber()
  readonly PM10: number;

  @IsNumber()
  readonly PM2_5: number;

  @IsNumber()
  readonly RH: number;

  @IsNumber()
  readonly temperature: number;

  @IsNumber()
  readonly internal_temperature: number;

 
}
