@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>
    ) {}

    async create(createPostDto: CreatePostDto, userId: number) {
        const post = this.postRepository.create({
            ...createPostDto,
            author: { id: userId }
        });
        return this.postRepository.save(post);
    }

    async findAll(page: number = 1, limit: number = 10) {
        const [posts, total] = await this.postRepository.findAndCount({
            relations: ['author', 'comments'],
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' }
        });

        return {
            data: posts,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    async delete(id: number, userId: number, isAdmin: boolean) {
        const post = await this.postRepository.findOne({
            where: { id },
            relations: ['author']
        });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        if (!isAdmin && post.author.id !== userId) {
            throw new ForbiddenException('You can only delete your own posts');
        }

        await this.postRepository.remove(post);
    }
}