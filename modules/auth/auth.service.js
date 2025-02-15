"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
let AuthService = class AuthService {
    constructor(userRepository, roleRepository, jwtService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = this.userRepository.create({
            ...registerDto,
            password: hashedPassword
        });
        const publisherRole = await this.roleRepository.findOne({ where: { name: 'publisher' } });
        user.roles = [publisherRole];
        return this.userRepository.save(user);
    }
    async login(loginDto) {
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email },
            relations: ['roles']
        });
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, email: user.email, roles: user.roles.map(r => r.name) };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    Injectable(),
    __param(0, InjectRepository(User)),
    __param(1, InjectRepository(Role)),
    __metadata("design:paramtypes", [typeof (_a = typeof Repository !== "undefined" && Repository) === "function" ? _a : Object, typeof (_b = typeof Repository !== "undefined" && Repository) === "function" ? _b : Object, typeof (_c = typeof JwtService !== "undefined" && JwtService) === "function" ? _c : Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map