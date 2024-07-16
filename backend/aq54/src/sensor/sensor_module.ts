import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from './sensor_entity';
import { SensorService } from './sensor_service';

@Module({
    imports: [TypeOrmModule.forFeature([Sensor])],
    providers: [SensorService],
    exports: [SensorService],
})
export class SensorModule {}