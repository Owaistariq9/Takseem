import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  BelongsTo,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Vehicles } from './vehicles.model';


@Table({ tableName: 'rides', timestamps: false })
export class Rides extends Model<Rides> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @BelongsTo(() => Vehicles)
  vehicle: Vehicles

  @ForeignKey(() => Vehicles)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  vehicle_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  start_time: number;

  @Column({
    type: DataType.INTEGER,
  })
  return_time: number;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.DECIMAL(10, 6),
  })
  latitude: string;

  @Column({
    type: DataType.DECIMAL(10, 6),
  })
  longitude: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  is_active: Boolean

  @Column({
    type: DataType.DATE,
  })
  status_change_at: Date

  @Column({
    type: DataType.STRING,
  })
  ride_type: string;

  @Column({
    type: DataType.INTEGER,
  })
  pick_in_km: number

  // @HasOne(() => Vehicles)
  // vehicle: Vehicles

}