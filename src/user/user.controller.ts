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
  UseGuards
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
  async create(@Body() createUserDto: CreateUserDto): Promise<string> {
    const data = await this.userService.create(createUserDto)

    return data.access_token;
  }

  @Get("/all")
  @UsePipes(new ValidationPipe())
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get()
  @UsePipes(new ValidationPipe())
  findOne(@Request() req) {
    const {id} = req.user
    return this.userService.findOne(id);
  }

  @Patch()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {

    const {id} = req.user
    return this.userService.update(id, updateUserDto);
  }
  @UseGuards(AuthGuard)
  @Delete()
  remove(@Request() req) {
    const {id} = req.user
    return this.userService.remove(id);
  }
}
