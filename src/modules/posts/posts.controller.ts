import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Body, 
    Param, 
    Query, 
    UseGuards,
    ParseIntPipe 
  } from '@nestjs/common';
  import { PostsService } from './posts.service';
  import { CreatePostDto, UpdatePostDto } from '../../dtos/post.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { RolesGuard } from '../../guards/roles.guard';
  import { Roles } from '../../decorators/roles.decorator';
  import { GetUser } from '../../decorators/get-user.decorator';
  
  @Controller('posts')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class PostsController {
    constructor(private readonly postsService: PostsService) {}
  
    @Get()
    async findAll(
      @Query('page', ParseIntPipe) page: number = 1,
      @Query('limit', ParseIntPipe) limit: number = 10
    ) {
      return this.postsService.findAll(page, limit);
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      return this.postsService.findOne(id);
    }
  
    @Post()
    @Roles('publisher', 'admin')
    async create(
      @Body() createPostDto: CreatePostDto,
      @GetUser('id') userId: number
    ) {
      return this.postsService.create(createPostDto, userId);
    }
  
    @Put(':id')
    @Roles('publisher', 'admin')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updatePostDto: UpdatePostDto,
      @GetUser('id') userId: number,
      @GetUser('roles') roles: string[]
    ) {
      const isAdmin = roles.includes('admin');
      return this.postsService.update(id, updatePostDto, userId, isAdmin);
    }
  
    @Delete(':id')
    @Roles('publisher', 'admin')
    async delete(
      @Param('id', ParseIntPipe) id: number,
      @GetUser('id') userId: number,
      @GetUser('roles') roles: string[]
    ) {
      const isAdmin = roles.includes('admin');
      return this.postsService.delete(id, userId, isAdmin);
    }
  }