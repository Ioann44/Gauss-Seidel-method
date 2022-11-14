import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { json } from 'stream/consumers';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('compute/:array')
  @HttpCode(202)
  compQuery(@Param('array') arr): string {
    let res = this.appService.compute(arr);
    return res;
  }
}
