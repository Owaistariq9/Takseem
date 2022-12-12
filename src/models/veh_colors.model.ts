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



@Table({ tableName: 'veh_colors', timestamps: false })
export class veh_colors extends Model<veh_colors> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true,
      })
      color: string;

      @Column({
        allowNull: false,
      })
      hex_code: string;
    
}