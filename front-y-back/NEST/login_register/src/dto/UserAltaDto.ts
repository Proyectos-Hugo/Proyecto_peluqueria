import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserAltaDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  constructor(email: string, password: string, role: string) {
    this.email = email;
    this.password = password;
    this.role = role;
  }
}