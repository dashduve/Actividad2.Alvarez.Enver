import { UsersService } from './users.service';
import { UpdateUserDto } from '../../dtos/user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<any>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<any>;
    delete(id: number): Promise<void>;
}
