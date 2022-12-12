
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDefined, IsEmail, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class authDTO {
    @ApiProperty()
    @IsString()
    email: string;
    @ApiProperty()
    @IsString()
    phone: string;
    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    password: string;
    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    token: string;
}
export class verifyCodeDTO {
    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    code: string;
    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    phone: string;
}
export class forgetPasswordDTO {
    @ApiProperty()
    @IsString()
    email: string;
    @ApiProperty()
    @IsString()
    phone: string;
}

export class updatePasswordFromPhoneDTO {
    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    code: string;
    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    phone: string;
    @ApiProperty()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    password: string;
}