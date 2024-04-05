import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  passwordConfirm?: string;

  @IsString()
  @IsOptional()
  currentPassword?: string;

  @IsOptional()
  team?: Types.ObjectId;
}
