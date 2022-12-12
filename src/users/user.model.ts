import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';


@Table({ tableName: 'users' })
export class User extends Model<User> {
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
  name: string;

  @Column({
  })
  profession: string;

  @Column({
    allowNull: false,
  })
  phone: string;

  @Column({
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    allowNull: true,
    validate: {
      isEmail: true,
    },
  })
  office_email: string;

  @Column({
    allowNull: true,
  })
  nic: string;

  @Column({
    allowNull: true,
  })
  nic_document: string;

  @Column({
    allowNull: false,
  })
  gender: string;

  @Column({
    allowNull: true,
  })
  picture: string;

  @Column({
    allowNull: true,
  })
  department: string;

  @Column({
    allowNull: false,
  })
  password: string;

  @Column({
    allowNull: false,
    defaultValue: 3
  })
  role_id: number;

  @Column({
    allowNull: false,
  })
  company_id: number;

  @Column({
    allowNull: false,
  })
  company_location_id: number;



  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;
}