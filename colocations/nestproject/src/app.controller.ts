import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get("files/:img")
  getFile(@Param('img') img): StreamableFile {
    const file = createReadStream(join(process.cwd(), './upload/'+img));
    return new StreamableFile(file);
  }

}
