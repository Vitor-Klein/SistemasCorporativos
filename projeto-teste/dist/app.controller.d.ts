import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
}
export declare class testeController {
    private configService;
    constructor(configService: ConfigService);
    getEnv(): {
        port: any;
        nodeEnv: any;
    };
}
