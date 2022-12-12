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
} from 'sequelize-typescript';
import { Vehicles } from './vehicles.model';


@Table({ tableName: 'ride_bookings', timestamps: true })
export class Ride_bookings extends Model<Ride_bookings> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

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
    type: DataType.ENUM("on", "off", "non"),
  })
  music: Boolean

  @Column({
    type: DataType.ENUM("on", "off", "non"),
  })
  smoking: String

  @Column({
    type: DataType.ENUM("on", "off", "non"),
  })
  ac: String

  @Column({
    type: DataType.ENUM("male", "female", "non"),
  })
  gender_preference: String

  @Column({
    type: DataType.INTEGER,
  })
  seats_available: number;
  
  @Column({
    type: DataType.BOOLEAN,
  })
  monday: Boolean

  @Column({
    type: DataType.BOOLEAN,
  })
  tuesday: Boolean

  @Column({
    type: DataType.BOOLEAN,
  })
  wednesday: Boolean

  @Column({
    type: DataType.BOOLEAN,
  })
  thursday: Boolean

  @Column({
    type: DataType.BOOLEAN,
  })
  friday: Boolean

  @Column({
    type: DataType.BOOLEAN,
  })
  saturday: Boolean

  @Column({
    type: DataType.BOOLEAN,
  })
  sunday: Boolean

  @Column({
    type: DataType.INTEGER,
  })
  pick_in_km: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: Boolean

}