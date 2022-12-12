import moment from 'moment';
// import * as moment from 'moment';
import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType
} from 'sequelize-typescript';
import { Constants } from 'src/core/constants/constants';


@Table({ tableName: 'otp_codes', timestamps: false })
export class OtpCodes extends Model<OtpCodes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  session_id: string;

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
    defaultValue: moment().add(Constants.otpExpiryMinutes, "m").format('YYYY-MM-DD HH:mm:ss')
  })
  expired_at: string;

  @Column({
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  })
  is_verified: boolean;

}