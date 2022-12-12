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
      allowNull: false,
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
      allowNull: false,
    })
    nic: string;

    @Column({
      allowNull: false,
    })
    nic_document: string;

    @Column({
      allowNull: false,
    })
    gender: string;

    @Column({
      allowNull: false,
    })
    picture: string;

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
    company_id: string;


  
    @CreatedAt public createdAt: Date;
  
    @UpdatedAt public updatedAt: Date;
  
    @DeletedAt public deletedAt: Date;
  }