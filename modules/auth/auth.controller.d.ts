import { AuthService } from './auth.service';
import { RegisterUserDto, LoginDto } from '../../dtos/auth.dto';
import { User } from '../../entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterUserDto): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        access_token: any;
    }>;
    getProfile(user: User): User;
}
