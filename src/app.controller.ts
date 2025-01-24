import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Test amacıyla bir endpoint
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Kullanıcıları döndüren endpoint
  @Get('users')
  async getUsers() {
    return await this.appService.getUsers();
  }

  // Rezervasyonları döndüren endpoint
  @Get('reservations')
  async getReservations() {
    return await this.appService.getReservations();
  }
}
