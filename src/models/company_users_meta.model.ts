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

import { companies } from './companies.model'

@Table({ tableName: 'company_users_meta' })
export class company_users_meta extends Model<company_users_meta> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({})
  email: string;

  @Column({})
  employee_id: string;

  @Column({})
  phone: string;

  @ForeignKey(() => companies)
  @Column({})
  company_id: number;

  @CreatedAt
  created_at: Date

  @UpdatedAt
  updatedAt: Date


  @BelongsTo(() => companies, { foreignKey: "id" })
  public company: companies;

}