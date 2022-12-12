import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './user.controller';
import { UsersDataService } from './user.data.service';
import { User } from './user.model';
import { UsersService } from './user.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersDataService],
  exports: [UsersService, UsersDataService]
})
export class UserModule { }
