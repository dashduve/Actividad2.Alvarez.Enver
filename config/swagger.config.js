"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('EduConnect API')
    .setDescription('API para la plataforma académica EduConnect')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
//# sourceMappingURL=swagger.config.js.map