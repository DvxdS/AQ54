import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SensorDataModule } from 'src/sensorData/sensorDat_module';
import { ApiModule } from 'src/api/api_module';
import { SchedulerService } from './scheduler_service';

@Module({
  imports: [ScheduleModule.forRoot(), SensorDataModule, ApiModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
