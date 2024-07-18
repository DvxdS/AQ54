import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SensorDataService } from 'src/sensorData/sensorData_service';

@Injectable()
export class SchedulerService implements OnModuleInit {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(private readonly sensorDataService: SensorDataService) {}

  async onModuleInit() {
    this.logger.debug('Application startup: Fetching data from stations.');
    await this.fetchDataFromStations();
    this.logger.debug('Initial data fetch completed.');
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    this.logger.debug('Cron job triggered: Fetching data from stations.');
    await this.fetchDataFromStations();
    this.logger.debug('Hourly data fetch completed.');
  }

  private async fetchDataFromStations() {
    const stations = [283164601, 283181971]; 

    for (const station of stations) {
      this.logger.debug(`Fetching data for station ${station}.`);
      try {
        await this.sensorDataService.fetchDataCurrentValues(station.toString());
        this.logger.debug(`Data fetch for station ${station} completed.`);
      } catch (error) {
        this.logger.error(`Failed to fetch data for station ${station}`, error);
      }
    }
  }
}
