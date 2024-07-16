import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async getStationHourlyAvg(stationId: string): Promise<any> {
    const url = `https://airqino-api.magentalab.it/v3/getStationHourlyAvg/${stationId}`;
    try {
      const response = await firstValueFrom(
        this.httpService.get(url).pipe(
          map(response => response.data),
          catchError(error => {
            console.error('Error fetching data from API:', error);
            throw error;
          })
        )
      );
      return response;
    } catch (error) {
      throw new Error('Failed to fetch data from API');
    }
  }
}
