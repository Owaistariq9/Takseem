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

@Table({ tableName: 'company_codes' })
export class company_codes extends Model<company_codes> {
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
  code: string;

  @ForeignKey(() => companies)
  @Column({})
  company_id: number;

  @CreatedAt
  created_at: Date

  @UpdatedAt
  regenerated_at: Date


  @BelongsTo(() => companies, { foreignKey: "id" })
  public company: companies;

}