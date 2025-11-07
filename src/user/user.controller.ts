import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
  Request,
  UseGuards, Param
} from '@nestjs/common';
import {UserService} from "./user.service.js";
import {CreateUserDto} from "./dto/create-user.dto.js";
import {UpdateUserDto} from "./dto/update-user.dto.js";
import {AuthService} from "../auth/auth.service.js";
import {AuthGuard} from "../auth/auth.guard.js";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const data = await this.userService.create(createUserDto)

    return data;
  }

  @Get("")
  @UsePipes(new ValidationPipe())
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  @UsePipes(new ValidationPipe())
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

    return this.userService.update(id, updateUserDto);
  }
  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
