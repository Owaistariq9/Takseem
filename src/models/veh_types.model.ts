import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasOne,
} from 'sequelize-typescript';
import { veh_makes } from './veh_makes.model';

@Table({ tableName: 'veh_types', timestamps: false })
export class veh_types extends Model<veh_types> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  max_seats: number;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  icon: string;

  @HasOne(() => veh_makes)
  makes: veh_makes;

}