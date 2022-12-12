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


@Table({ tableName: 'ride_days', timestamps: false })
export class Ride_days extends Model<Ride_days> {
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
  ride_id: number;

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
    type: DataType.DATE,
  })
  range_start: Date

  @Column({
    type: DataType.DATE,
  })
  range_end: Date;


}