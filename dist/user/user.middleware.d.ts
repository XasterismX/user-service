import { NestMiddleware } from '@nestjs/common';
export declare class UserMiddleware implements NestMiddleware {
    private readonly logger;
    use(req: any, res: any, next: () => void): "Not vaild token" | undefined;
}
