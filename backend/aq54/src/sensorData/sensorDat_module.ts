import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorData } from './sensorData_entity';
import { SensorDataService } from './sensorData_service';
import { ApiModule } from 'src/api/api_module';

@Module({
    imports: [TypeOrmModule.forFeature([SensorData]), ApiModule],
    providers: [SensorDataService],
    exports: [SensorDataService],

})
export class SensorDataModule{}