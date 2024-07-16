import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SensorData } from '../sensorData/sensorData_entity';

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  
}
