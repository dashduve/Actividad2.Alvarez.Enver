import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../entities/comment.entity';
import { CreateCommentDto } from '../../dtos/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async findByPost(postId: number) {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }

  async create(createCommentDto: CreateCommentDto, userId: number) {
    const comment = this.commentRepository.create({
      ...createCommentDto,
      author: { id: userId },
      post: { id: createCommentDto.postId },
    });
    return this.commentRepository.save(comment);
  }

  async delete(id: number, userId: number, isAdmin: boolean) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (!isAdmin && comment.author.id !== userId) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    await this.commentRepository.remove(comment);
  }
}