
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDefined, IsEmail, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class authDTO {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    vehicle_id:number;

    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    document_name:string;

    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    document_number:string;

    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    document_expiry:string;

    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    document_url:string;

    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    document_identifier:string;
}