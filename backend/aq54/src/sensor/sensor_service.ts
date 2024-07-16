import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor } from './sensor_entity';
import { CreateSensorDto } from './dto/sensor_dto';



@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(Sensor)
    private readonly sensorRepository: Repository<Sensor>,
  ) {}

  create(createSensorDto: CreateSensorDto): Promise<Sensor> {
    const sensor = this.sensorRepository.create(createSensorDto);
    return this.sensorRepository.save(sensor);
  }

  findAll(): Promise<Sensor[]> {
    return this.sensorRepository.find();
  }

  findOne(id: number): Promise<Sensor> {
    return this.sensorRepository.findOneBy({ id });
  }

  async update(id: number, sensor: Sensor): Promise<Sensor> {
    await this.sensorRepository.update(id, sensor);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.sensorRepository.delete(id);
  }
}
