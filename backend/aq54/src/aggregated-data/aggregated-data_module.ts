import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AggregatedDataController } from './aggregated-data_controller';
import { AggregatedDataService } from './aggregated-data_service';
import { SensorData } from 'src/sensorData/sensorData_entity';

@Module({
    imports: [TypeOrmModule.forFeature([SensorData])],
    providers: [AggregatedDataService],
    controllers: [AggregatedDataController],
  })
  export class AggregatedDataModule {}
