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
  HasOne,
} from 'sequelize-typescript';
import { cities } from './cities.model';

import { company_addresses } from './company_addresses.model'
import { company_codes } from './company_codes.model';
import { company_contactpersons } from './company_contactpersons';
import { User } from './user.model';

@Table({ tableName: 'companies' })
export class companies extends Model<companies> {
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
  email: string;

  @Column({})
  employee_strength: string;

  @Column({})
  type_industry: string;

  @Column({})
  ntn: string;

  @Column({})
  owner_name: string;
  @Column({})
  owner_contact: string;

  @Column({})
  website: string;

  @Column({ type: DataType.BOOLEAN })
  is_verified: boolean;

  @Column({ type: DataType.BOOLEAN })
  is_active: boolean;

  @Column({ type: DataType.BOOLEAN })
  is_deleted: boolean;

  @HasMany(() => User)
  users: User;

  @HasMany(() => company_addresses)
  addresses: company_addresses;


  @HasMany(() => company_contactpersons)
  contactPersons: company_contactpersons;

  @HasOne(() => company_codes)
  company_codes: company_codes;


}