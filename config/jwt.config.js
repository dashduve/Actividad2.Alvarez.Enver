"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtConfig = void 0;
const getJwtConfig = (configService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: {
        expiresIn: '1d',
    },
});
exports.getJwtConfig = getJwtConfig;
//# sourceMappingURL=jwt.config.js.map