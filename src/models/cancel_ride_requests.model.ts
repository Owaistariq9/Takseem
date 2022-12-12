import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'cancel_ride_requests', timestamps: true })
export class CancelRideRequests extends Model<CancelRideRequests> {
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
  ride_request_id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  message: string;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;

}