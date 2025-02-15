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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("../../entities/comment.entity");
let CommentsService = class CommentsService {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async findByPost(postId) {
        return this.commentRepository.find({
            where: { post: { id: postId } },
            relations: ['author'],
            order: { createdAt: 'DESC' },
        });
    }
    async create(createCommentDto, userId) {
        const comment = this.commentRepository.create({
            ...createCommentDto,
            author: { id: userId },
            post: { id: createCommentDto.postId },
        });
        return this.commentRepository.save(comment);
    }
    async delete(id, userId, isAdmin) {
        const comment = await this.commentRepository.findOne({
            where: { id },
            relations: ['author'],
        });
        if (!comment) {
            throw new common_1.NotFoundException('Comment not found');
        }
        if (!isAdmin && comment.author.id !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own comments');
        }
        await this.commentRepository.remove(comment);
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], CommentsService);
//# sourceMappingURL=comments.service.js.map