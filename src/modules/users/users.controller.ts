import {
    Controller,
    Get,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    ParseIntPipe,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { UpdateUserDto } from '../../dtos/user.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { RolesGuard } from '../../guards/roles.guard';
  import { Roles } from '../../decorators/roles.decorator';
  
  @Controller('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Get()
    @Roles('admin')
    async findAll() {
      return this.usersService.findAll();
    }
  
    @Put(':id')
    @Roles('admin')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateUserDto: UpdateUserDto
    ) {
      return this.usersService.update(id, updateUserDto);
    }
  
    @Delete(':id')
    @Roles('admin')
    async delete(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.delete(id);
    }
  }