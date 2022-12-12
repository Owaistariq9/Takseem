import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
} from 'sequelize-typescript';

import { User } from './user.model';


@Table({ tableName: 'users_last_locations', createdAt: false })
export class UserLastLocations extends Model<UserLastLocations> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  user_id: string;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL
  })
  latitude: number;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL
  })
  longitude: number;

  @UpdatedAt public updatedAt: Date;

}