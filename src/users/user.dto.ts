
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDefined, IsEmail, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class userDTO {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name:string;
    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    profession:string;
    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    phone:string;
    @ApiProperty()
    @IsEmail()
    @IsDefined()
    @IsNotEmpty()
    email:string;
    @IsString()
    @ApiProperty()
    nic: string;
    @IsString()
    @ApiProperty()
    nic_document:string;
    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    gender:string;
    @IsString()
    @ApiProperty()
    picture:string;
    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    password:string;
    @ApiProperty()
    @IsNumber()
    role_id:number;
    @IsNumber()
    @ApiProperty()
    company_id:number;
}