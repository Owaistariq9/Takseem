import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';


@Table({ tableName: 'company_codes' })
export class CompanyCodes extends Model<CompanyCodes> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column({
    allowNull: false,
  })
  company_id: number;

  @Column({
    allowNull: false,
  })
  code: string;

  @CreatedAt public created_at: Date;

  @UpdatedAt public regenerated_at: Date;
}