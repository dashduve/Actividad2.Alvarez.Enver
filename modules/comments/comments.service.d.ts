import { Repository } from 'typeorm';
import { Comment } from '../../entities/comment.entity';
import { CreateCommentDto } from '../../dtos/comment.dto';
export declare class CommentsService {
    private readonly commentRepository;
    constructor(commentRepository: Repository<Comment>);
    findByPost(postId: number): Promise<any>;
    create(createCommentDto: CreateCommentDto, userId: number): Promise<any>;
    delete(id: number, userId: number, isAdmin: boolean): Promise<void>;
}
