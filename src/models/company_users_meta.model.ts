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

@Table({ tableName: 'company_users_meta' })
export class CompanyUsersMeta extends Model<CompanyUsersMeta> {
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
  email: string;

  @Column({})
  company_id: number;

  @Column({})
  employee_id: string;

  @Column({})
  phone: string;

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date


}