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
import { veh_models } from './veh_models.model';

import { veh_types } from './veh_types.model'

@Table({ tableName: 'veh_makes', timestamps: false })
export class veh_makes extends Model<veh_makes> {
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

  @ForeignKey(() => veh_types)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  type_id: number;

  @BelongsTo(() => veh_types, { foreignKey: "id" })
  public type: veh_types;

  @HasOne(() => veh_models)
  models: veh_models;

}