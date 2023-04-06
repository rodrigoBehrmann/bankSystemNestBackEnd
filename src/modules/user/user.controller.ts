import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto): Promise<any> {
    return this.userService.create(data);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.userService.findOne(id);
  }

  @Get('returnMoney/:id')
  async returnMoney(@Param('id') id: number): Promise<any> {
    return this.userService.returnMoney(id);
  }

  @Post('removeMoney/:id')
  removeMoneyFromUser(@Param('id') id: number, @Body('amount') amount: number): Promise<any> {
    return this.userService.removeMoneyFromUser(id, amount);
  }

  @Post('addMoney/:id')
  addMoneytoUser(@Param('id') id: number, @Body('amount') amount: number): Promise<any> {
    return this.userService.addMoneyToUser(id, amount);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
