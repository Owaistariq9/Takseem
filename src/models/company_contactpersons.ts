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
import { company_roles } from './company_roles.model';

@Table({ tableName: 'company_contactpersons' })
export class company_contactpersons extends Model<company_contactpersons> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
  })
  name: string;

  @Column({
  })
  email: string;

  @Column({
  })
  phone: string;

  @ForeignKey(() => companies)
  @Column({})
  company_id: number;

  @ForeignKey(() => company_roles)
  @Column({})
  company_role_id: number;

  @Column({
  })
  designation: string;

  @Column({
  })
  department: string;

  @Column({
  })
  is_active: boolean;

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date


  @BelongsTo(() => companies, { foreignKey: "id" })
  public company: companies;

  @BelongsTo(() => company_roles, { foreignKey: "id" })
  public role: company_roles;

}