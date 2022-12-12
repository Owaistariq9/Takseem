import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
} from 'sequelize-typescript';


@Table({ tableName: 'notifications' })
export class Notifications extends Model<Notifications> {
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
    userId: number;

    @Column({
        allowNull: false,
    })
    title: string;

    @Column({
        allowNull: false,
    })
    body: string;

    @Column({
        allowNull: false,
    })
    data: string;

    @Column({
        allowNull: false,
    })
    userType: string;

    @Column({
        defaultValue: false,
    })
    isSeen: boolean;


    @CreatedAt public createdAt: Date;

    @UpdatedAt public updatedAt: Date;

    @DeletedAt public deletedAt: Date;
}