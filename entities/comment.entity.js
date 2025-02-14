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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
let Comment = class Comment {
};
exports.Comment = Comment;
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    Column('text'),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    ManyToOne(() => User, user => user.comments),
    __metadata("design:type", typeof (_a = typeof User !== "undefined" && User) === "function" ? _a : Object)
], Comment.prototype, "author", void 0);
__decorate([
    ManyToOne(() => Post, post => post.comments),
    __metadata("design:type", typeof (_b = typeof Post !== "undefined" && Post) === "function" ? _b : Object)
], Comment.prototype, "post", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Comment.prototype, "updatedAt", void 0);
exports.Comment = Comment = __decorate([
    Entity('comments')
], Comment);
//# sourceMappingURL=comment.entity.js.map