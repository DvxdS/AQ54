import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user_entity'
import { SensorData } from './sensorData/sensorData_entity';
import { SensorDataModule } from './sensorData/sensorDat_module';
import { ApiModule } from './api/api_module';
import { SchedulerModule } from './scheduler/scheduler_module';
import { AggregatedDataModule } from './aggregated-data/aggregated-data_module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'davdev',
      database: 'aq54',
      synchronize: true,
      logging: true,
      entities: [User,  SensorData],
    }),
    
    SensorDataModule,
    ApiModule,
    SchedulerModule,
    AggregatedDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
