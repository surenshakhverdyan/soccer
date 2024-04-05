import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class JoinCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;
}
