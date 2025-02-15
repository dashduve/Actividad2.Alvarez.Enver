"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
let PostsService = class PostsService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async create(createPostDto, userId) {
        const post = this.postRepository.create({
            ...createPostDto,
            author: { id: userId }
        });
        return this.postRepository.save(post);
    }
    async findAll(page = 1, limit = 10) {
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
    async delete(id, userId, isAdmin) {
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
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Post)),
    __metadata("design:paramtypes", [typeof (_a = typeof Repository !== "undefined" && Repository) === "function" ? _a : Object])
], PostsService);
//# sourceMappingURL=post.service.js.map