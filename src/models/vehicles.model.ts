import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasOne,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Rides } from './rides.model';

@Table({ tableName: 'vehicles', timestamps: true })
export class Vehicles extends Model<Vehicles> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  model_id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  fuel_type: string;

  @Column({
    type: DataType.STRING
  })
  color: string;

  @Column({
    type: DataType.STRING
  })
  engine: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  is_active: string;

  @Column({
    type: DataType.STRING
  })
  picture: string;

  @HasOne(() => Rides)
  ride: Rides;


}