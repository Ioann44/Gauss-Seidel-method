import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('compute/:array')
  @HttpCode(204)
  compQuery(@Param('array') arr): string {
    let res = this.appService.compute(arr);
    console.log(res);
    return "unga bunga";
  }
}
