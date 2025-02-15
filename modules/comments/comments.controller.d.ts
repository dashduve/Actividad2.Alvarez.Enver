import { CommentsService } from './comments.service';
import { CreateCommentDto } from '../../dtos/comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    findByPost(postId: number): Promise<any>;
    create(createCommentDto: CreateCommentDto, userId: number): Promise<any>;
    delete(id: number, userId: number, roles: string[]): Promise<void>;
}
