import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SensorDataService } from './sensorData_service';
import { SensorData } from './sensorData_entity';
import { CreateSensorDataDto } from './dto/sensortData_dto';

@Controller('sensor-data')
export class SensorDataController {
  constructor(private readonly sensorDataService: SensorDataService) {}

  @Post()
    create(@Body() createSensorDataDto: CreateSensorDataDto): Promise<SensorData> {
  return this.sensorDataService.create(createSensorDataDto);
}

  @Get()
  findAll(): Promise<SensorData[]> {
    return this.sensorDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<SensorData> {
    return this.sensorDataService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateSensorDataDto: SensorData): Promise<SensorData> {
    return this.sensorDataService.update(id, updateSensorDataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.sensorDataService.remove(id);
  }
}
