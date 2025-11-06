"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMiddleware = void 0;
const common_1 = require("@nestjs/common");
let UserMiddleware = UserMiddleware_1 = class UserMiddleware {
    logger = new common_1.Logger(UserMiddleware_1.name);
    use(req, res, next) {
        const header = req.headers["Authorization"];
        if (!header) {
            res.status(401).send('Not authorized');
            return;
        }
        const token = header.split(' ')[0];
        if (!token) {
            return "Not vaild token";
        }
        this.logger.log(`[${req.method}]`);
        next();
    }
};
exports.UserMiddleware = UserMiddleware;
exports.UserMiddleware = UserMiddleware = UserMiddleware_1 = __decorate([
    (0, common_1.Injectable)()
], UserMiddleware);
//# sourceMappingURL=user.middleware.js.map