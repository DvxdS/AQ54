import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SensorData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  station_name: string;

  @Column({ type: 'float' })
  station_lat: number;

  @Column({ type: 'float', nullable: true })
  station_lon: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column('float')
  CO: number;

  @Column('float')
  temperature: number;

  @Column('float')
  internal_temperature: number;

  @Column('float')
  NO2: number;

  @Column('float')
  O3: number;

  @Column('float')
  PM10: number;

  @Column('float')
  PM2_5: number;

  @Column('float')
  RH: number;
}
