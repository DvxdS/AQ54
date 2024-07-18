import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorData} from 'src/sensorData/sensorData_entity';

@Injectable()
export class AggregatedDataService{
    constructor(
        @InjectRepository(SensorData)
         private sensorDataRepository: Repository<SensorData>,

    ) {}
    async getHourlyAverages(): Promise<any> {
        try {
          Logger.log('Querying database for hourly averages');
          const data = await this.sensorDataRepository.find();
    
          const result = {};
    
          data.forEach((entry) => {
            const date = entry.timestamp.toISOString().split('T')[0];
            const hour = entry.timestamp.getHours();
            const station = entry.station_name;
    
            if (!result[station]) {
              result[station] = {};
            }
    
            if (!result[station][date]) {
              result[station][date] = {
                CO: {},
                O3: {},
                PM2_5: {},
                PM10: {},
                NO2: {},
                temperature: {},
                internal_temperature: {},
                RH: {},
              };
            }
    
            // Ensure each hour object is initialized before setting values
            Object.keys(result[station][date]).forEach((metric) => {
              if (!result[station][date][metric][hour]) {
                result[station][date][metric][hour] = 0;
              }
            });
    
            result[station][date].CO[hour] = parseFloat(entry.CO.toFixed(2));
            result[station][date].O3[hour] = parseFloat(entry.O3.toFixed(2));
            result[station][date].PM2_5[hour] = parseFloat(entry.PM2_5.toFixed(2));
            result[station][date].PM10[hour] = parseFloat(entry.PM10.toFixed(2));
            result[station][date].NO2[hour] = parseFloat(entry.NO2.toFixed(2));
            result[station][date].temperature[hour] = parseFloat(entry.temperature.toFixed(2));
            result[station][date].internal_temperature[hour] = parseFloat(entry.internal_temperature.toFixed(2));
            result[station][date].RH[hour] = parseFloat(entry.RH.toFixed(2));
          });
    
          return result;
        } catch (error) {
          Logger.error('Error fetching and aggregating data', error);
          throw new Error('Failed to fetch and aggregate data');
        }
      }

      // Aggregation des data par jour
      async getDailyAverages(): Promise<any> {
        try {
          Logger.log('Querying database for daily averages');
          const data = await this.sensorDataRepository.find();
    
          const result = {};
    
          data.forEach((entry) => {
            const date = entry.timestamp.toISOString().split('T')[0];
            const station = entry.station_name;
    
            if (!result[station]) {
              result[station] = {};
            }
    
            if (!result[station][date]) {
              result[station][date] = {
                CO: [],
                O3: [],
                PM2_5: [],
                PM10: [],
                NO2: [],
                temperature: [],
                internal_temperature: [],
                RH: [],
              };
            }
    
            result[station][date].CO.push(entry.CO);
            result[station][date].O3.push(entry.O3);
            result[station][date].PM2_5.push(entry.PM2_5);
            result[station][date].PM10.push(entry.PM10);
            result[station][date].NO2.push(entry.NO2);
            result[station][date].temperature.push(entry.temperature);
            result[station][date].internal_temperature.push(entry.internal_temperature);
            result[station][date].RH.push(entry.RH);
          });
    
          // Calculer la moyenne des metrics par jour 
          Object.keys(result).forEach(station => {
            Object.keys(result[station]).forEach(date => {
              Object.keys(result[station][date]).forEach(metric => {
                const sum = result[station][date][metric].reduce((acc, value) => acc + value, 0);
                const average = parseFloat((sum / result[station][date][metric].length).toFixed(2));
                result[station][date][metric] = average;
              });
            });
          });
    
          return result;
        } catch (error) {
          Logger.error('Error fetching and aggregating daily data', error);
          throw new Error('Failed to fetch and aggregate daily data');
        }
      }
      
} 