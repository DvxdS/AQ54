// sensor-data.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorData } from './sensorData_entity';
import { CreateSensorDataDto } from './dto/sensortData_dto';
import { ApiService } from 'src/api/api_services';

@Injectable()
export class SensorDataService {
  constructor(
    @InjectRepository(SensorData)
    private readonly sensorDataRepository: Repository<SensorData>,
    private readonly apiService: ApiService,
  ) {}

  create(createSensorDataDto: CreateSensorDataDto): Promise<SensorData> {
    const sensorData = this.sensorDataRepository.create(createSensorDataDto);
    return this.sensorDataRepository.save(sensorData);
  }

  findAll(): Promise<SensorData[]> {
    return this.sensorDataRepository.find();
  }

  findOne(id: number): Promise<SensorData> {
    return this.sensorDataRepository.findOneBy({ id });
  }

  async update(id: number, sensorData: SensorData): Promise<SensorData> {
    await this.sensorDataRepository.update(id, sensorData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.sensorDataRepository.delete(id);
  }

  async fetchDataCurrentValues(stationId: string): Promise<void> {
    try {
      const response = await this.apiService.getStationHourlyAvg(stationId);
      const { header, data } = response;
    
      //console.log('Header:', header);
      //console.log('First 50 Data Rows:', data.slice(0, 15));
    
      if (!data || !Array.isArray(data) || data.length === 0) {
        console.error('No data received or data is empty.');
        return;
      }
    
      const station_name = header.station_name;
      const station_lat = header.station_lat;
      const station_lon = header.station_lon;
    
      const createSensorDataDtos: CreateSensorDataDto[] = [];
    
      // Transform the data into CreateSensorDataDto format
      for (const item of data) {
        if (!item.timestamp || item.CO === undefined || item.T === undefined || item['T. int.'] === undefined || 
            item.NO2 === undefined || item.O3 === undefined || item.PM10 === undefined || item['PM2.5'] === undefined || 
            item.RH === undefined) {
          console.error('Incomplete data item:', item);
          continue; // Skip incomplete data items
        }
    
        const createSensorDataDto: CreateSensorDataDto = {
          station_name,
          station_lat,
          station_lon,
          timestamp: new Date(item.timestamp),
          CO: item.CO,
          temperature: item.T,
          internal_temperature: item['T. int.'],
          NO2: item.NO2,
          O3: item.O3,
          PM10: item.PM10,
          PM2_5: item['PM2.5'],
          RH: item.RH,
        };
    
        console.log('createSensorDataDto:', createSensorDataDto);
    
        createSensorDataDtos.push(createSensorDataDto);
      }
    
      if (createSensorDataDtos.length === 0) {
        console.error('No valid sensor data to insert.');
        return;
      }
    
      // Save each sensor data to the database
      for (const createSensorDataDto of createSensorDataDtos) {
        try {
          await this.create(createSensorDataDto);
        } catch (saveError) {
          console.error('Error saving sensor data to the database:', saveError);
        }
      }
    } catch (error) {
      console.error('Error fetching hourly averages:', error);
      // Handle error appropriately
    }
  }    
}