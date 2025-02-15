import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Role } from './role.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    fullName: string;
    avatar?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    posts: Post[];
    comments: Comment[];
    roles: Role[];
}
