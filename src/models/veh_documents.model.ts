import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
} from 'sequelize-typescript';



@Table({ tableName: 'veh_documents', timestamps: false })
export class Veh_documents extends Model<Veh_documents> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,

    allowNull: false,
  })
  vehicle_id: number;

  @Column({
    allowNull: false,
  })
  document_name: string;

  @Column({
    allowNull: false,
  })
  document_number: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  document_expiry: Date;

  @Column({
    allowNull: false,
  })
  document_url: string;

  @Column({
    allowNull: false,
  })
  document_identifier: string;


}