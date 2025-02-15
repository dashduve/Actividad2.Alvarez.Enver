import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { UpdateUserDto } from '../../dtos/user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<any>;
    findById(id: number): Promise<any>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<any>;
    delete(id: number): Promise<void>;
}
