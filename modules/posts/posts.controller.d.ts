import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from '../../dtos/post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(page?: number, limit?: number): Promise<any>;
    findOne(id: number): Promise<any>;
    create(createPostDto: CreatePostDto, userId: number): Promise<any>;
    update(id: number, updatePostDto: UpdatePostDto, userId: number, roles: string[]): Promise<any>;
    delete(id: number, userId: number, roles: string[]): Promise<any>;
}
