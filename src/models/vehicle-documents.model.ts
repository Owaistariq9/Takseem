import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
  } from 'sequelize-typescript';

  
  @Table({ tableName: 'vehicle_documents' })
  export class VehicleDocuments extends Model<VehicleDocuments> {
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

    @CreatedAt public createdAt: Date;
  
    @UpdatedAt public updatedAt: Date;
  
    @DeletedAt public deletedAt: Date;
  }