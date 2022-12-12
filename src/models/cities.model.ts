import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    HasMany,
  } from 'sequelize-typescript';
import { company_addresses } from './company_addresses.model';

@Table({ tableName: 'cities', timestamps: false })
export class cities extends Model<cities> {
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
        type: DataType.DECIMAL,
        allowNull: false,
      })
      longitude: number;

      @Column({
        allowNull: false,
        type: DataType.DECIMAL
      })
      latitude: number;

      @HasMany(() => company_addresses)
      addresses: company_addresses;
    
}