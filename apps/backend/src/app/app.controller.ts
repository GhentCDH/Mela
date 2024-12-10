import {Controller, Get, Logger,} from '@nestjs/common';

import {AppService} from './app.service';


@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getData() {
        Logger.log('Nest hello api', 'AppController');
        return 'Hello API';
    }
    
}


