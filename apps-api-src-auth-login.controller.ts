import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class LoginController {
  constructor(private users: UsersService, private jwt: JwtService) {}

  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body;
    const u = await this.users.findByEmail(email);
    if (!u) return { error: 'Invalid credentials' };
    const ok = await bcrypt.compare(password, u.passwordHash);
    if (!ok) return { error: 'Invalid credentials' };
    const payload = { userId: u.id, email: u.email, orgId: u.orgId, role: u.role };
    return { accessToken: this.jwt.sign(payload) };
  }
}
