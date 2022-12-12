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
} from 'sequelize-typescript';


@Table({ tableName: 'ride_requests' })
export class RideRequests extends Model<RideRequests> {
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
    ride_id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    passenger_id: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_approved: boolean;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    })
    is_pending: boolean;

    @CreatedAt public createdAt: Date;

    @UpdatedAt public updatedAt: Date;

    @DeletedAt public deletedAt: Date;

}