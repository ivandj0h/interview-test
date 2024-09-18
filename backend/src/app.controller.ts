import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getWelcomeMessage(): string {
    return this.appService.getWelcomeMessage();
  }

  @Get()
  getRoot() {
    return {
      message: 'Welcome to the NestJS Application. Please visit /api for API endpoints.',
    };
  }
}
