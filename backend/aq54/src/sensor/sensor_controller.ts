import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SensorService } from './sensor_service';
import { Sensor } from './sensor_entity';
import { CreateSensorDto } from './dto/sensor_dto';

@Controller('sensors')
export class SensorController {
    constructor (private readonly sensorService: SensorService){}
    @Post()
    create(@Body() createSensorDto: CreateSensorDto): Promise<Sensor> {
      return this.sensorService.create(createSensorDto);
    }


    @Get()
    findAll(): Promise<Sensor[]> {
      return this.sensorService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Sensor> {
      return this.sensorService.findOne(id);
    }
    @Put(':id')
    update(@Param('id') id: number, @Body() updateSensorDto: Sensor): Promise<Sensor> {
      return this.sensorService.update(id, updateSensorDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
      return this.sensorService.remove(id);
    }
}