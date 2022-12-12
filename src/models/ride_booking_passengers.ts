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
    HasOne,
} from 'sequelize-typescript';
import { Ride_bookings } from './ride_bookings.model';


@Table({ tableName: 'ride_booking_passengers', updatedAt: false, createdAt: true })
export class RideBookingPassengers extends Model<RideBookingPassengers> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @BelongsTo(() => Ride_bookings)
    booking: Ride_bookings

    @ForeignKey(() => Ride_bookings)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    booking_id: number;


    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    passenger_id: number;


}