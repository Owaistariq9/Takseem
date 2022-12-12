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
} from 'sequelize-typescript';
import { cities } from './cities.model';

import { companies } from './companies.model'

@Table({ tableName: 'company_addresses' })
export class company_addresses extends Model<company_addresses> {
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
  formatted_address: string;

  @Column({
    allowNull: false,
  })
  google_address: string;

  @Column({
    type: DataType.DECIMAL(10, 6)
  })
  latitude: number;

  @Column({
    type: DataType.DECIMAL(10, 6)
  })
  longitude: number;

  @ForeignKey(() => cities)
  @Column({})
  city_id: number;

  @ForeignKey(() => companies)
  @Column({})
  company_id: number;


  @Column({ type: DataType.BOOLEAN })
  is_active: boolean;


  @BelongsTo(() => companies, { foreignKey: "id" })
  public company: companies;

  @BelongsTo(() => cities, { foreignKey: "id" })
  public city: cities;

}