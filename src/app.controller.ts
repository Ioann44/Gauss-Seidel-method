import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { query } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('compute/:array')
  @HttpCode(204)
  compQuery(@Param('array') arr) {
    console.log(arr);

    return this.appService.compute(arr);
  }
}
