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


@Table({ tableName: 'ride_preferences', timestamps: false })
export class Ride_preferences extends Model<Ride_preferences> {
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


}