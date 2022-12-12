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
  HasOne,
} from 'sequelize-typescript';
import { Vehicles } from './vehicles.model';
import { veh_makes } from './veh_makes.model';



@Table({ tableName: 'veh_models', timestamps: false })
export class veh_models extends Model<veh_models> {
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
  name: string;

  @Column({
    allowNull: false,
  })
  engine_class: string;

  @Column({
    allowNull: false,
  })
  engine_cc: string;

  @ForeignKey(() => veh_makes)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  make_id: number;

  @BelongsTo(() => veh_makes, { foreignKey: "id" })
  make: veh_makes;

  @HasOne(() => Vehicles)
  vehicle: Vehicles;

}