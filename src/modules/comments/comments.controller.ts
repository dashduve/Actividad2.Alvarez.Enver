import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    UseGuards,
    ParseIntPipe,
  } from '@nestjs/common';
  import { CommentsService } from './comments.service';
  import { CreateCommentDto } from '../../dtos/comment.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { RolesGuard } from '../../guards/roles.guard';
  import { Roles } from '../../decorators/roles.decorator';
  import { GetUser } from '../../decorators/get-user.decorator';
  
  @Controller('comments')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}
  
    @Get('post/:postId')
    async findByPost(@Param('postId', ParseIntPipe) postId: number) {
      return this.commentsService.findByPost(postId);
    }
  
    @Post()
    @Roles('publisher', 'admin')
    async create(
      @Body() createCommentDto: CreateCommentDto,
      @GetUser('id') userId: number
    ) {
      return this.commentsService.create(createCommentDto, userId);
    }
  
    @Delete(':id')
    @Roles('publisher', 'admin')
    async delete(
      @Param('id', ParseIntPipe) id: number,
      @GetUser('id') userId: number,
      @GetUser('roles') roles: string[]
    ) {
      const isAdmin = roles.includes('admin');
      return this.commentsService.delete(id, userId, isAdmin);
    }
  }

  