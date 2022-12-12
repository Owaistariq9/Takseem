// import moment from 'moment';
import * as moment from 'moment';
import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { Constants } from 'src/core/constants/constants';


@Table({ tableName: 'otp_codes' })
export class OtpCodes extends Model<OtpCodes> {
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
  user_email: string;

  @Column({
    allowNull: false,
  })
  user_phone: string;

  @Column({
    allowNull: false,
  })
  api_name: string;

  @Column({
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataTypes.STRING,
    defaultValue: moment(new Date()).add(parseInt(Constants.otpExpiryMinutes), "minutes").toString()
  })
  expired_at: string;

  @Column({
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  })
  is_verified: boolean;


  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;
}