@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        private jwtService: JwtService
    ) {}

    async register(registerDto: RegisterUserDto) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = this.userRepository.create({
            ...registerDto,
            password: hashedPassword
        });
        
        // Asignar rol de publicador por defecto
        const publisherRole = await this.roleRepository.findOne({ where: { name: 'publisher' } });
        user.roles = [publisherRole];
        
        return this.userRepository.save(user);
    }

    async login(loginDto: LoginDto) {
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
}