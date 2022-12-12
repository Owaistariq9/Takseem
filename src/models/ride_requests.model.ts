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
import { Rides } from './rides.model';


@Table({ tableName: 'ride_requests' })
export class RideRequests extends Model<RideRequests> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    // @HasOne(() => Rides, { foreignKey: "ride_id" })
    // rides: Rides;
    @BelongsTo(() => Rides)
    rides: Rides

    @ForeignKey(() => Rides)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    ride_id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    passenger_id: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: "pending"
    })
    status: string;

    @CreatedAt public createdAt: Date;

    @UpdatedAt public updatedAt: Date;

    @DeletedAt public deletedAt: Date;
}