import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/traffic-and-weather-data')
  async getTrafficAndWeatherData(@Query('date') date: string): Promise<any> {
    return await this.appService.getTrafficAndWeatherData(date);
  }
}
