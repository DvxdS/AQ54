import { Controller, Get } from '@nestjs/common';
import { AggregatedDataService } from './aggregated-data_service';

@Controller('aggregated-data')
export class AggregatedDataController {
  constructor(private readonly aggregatedDataService: AggregatedDataService) {}

  @Get('/hourly-averages')
  async getHourlyAverages() {
    try {
      const hourlyAverages = await this.aggregatedDataService.getHourlyAverages();
      return {
        status: 'success',
        data: hourlyAverages,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to fetch hourly averages.',
      };
    }
  }

  @Get('/daily-averages')
  async getDailyAverages() {
    try {
      const dailyAverages = await this.aggregatedDataService.getDailyAverages();
      return {
        status: 'success',
        data: dailyAverages,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to fetch daily averages.',
      };
    }
  }
}