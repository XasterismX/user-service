import {HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger} from '@nestjs/common';

import {ConfigService} from "@nestjs/config";
import {UpdateUserDto} from "./dto/update-user.dto.js";
import {CreateUserDto} from "./dto/create-user.dto.js";
import {User} from "./entities/user.entity.js";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AuthService} from "../auth/auth.service.js";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly cfgService: ConfigService,
              @InjectRepository(User) private readonly userRepository: Repository<User>,
              private readonly authService: AuthService,
  ) {
  }
  async create(createUserDto: CreateUserDto): Promise<{
    user: User;
    access_token: string;
  }> {
    try {
      const existedUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
      if (existedUser) {
        throw new HttpException("User already exists", HttpStatus.BAD_REQUEST)
      }
      const hash = await bcrypt.hash(createUserDto.password, 10);
      const token = await this.authService.createToken(createUserDto.email, createUserDto.age)
      const user = await this.userRepository.save({email: createUserDto.email, age: createUserDto.age, password: hash})
      return {
        user: user,
        access_token: token.access_token,
    }
    }catch(err) {

      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find()
    }catch(err) {
      this.logger.error(err.message)
      throw new InternalServerErrorException(err.message)
    }

  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } })
      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND)
      }
      return user


    }catch (err) {
      this.logger.error(err.message)
      throw new InternalServerErrorException(err.message)
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const existedUser = await this.findOne(id)
      if (!existedUser) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND)
      }
      if (updateUserDto.password){
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)
      }
      const updateUser = await this.userRepository.merge(existedUser, updateUserDto)
      await this.userRepository.save(updateUser)
    }catch (err) {
      this.logger.error(err.message)
      throw new InternalServerErrorException(err.message)
    }

  }

  async remove(id: string): Promise<boolean> {
    try {
      const existedUser = await this.findOne(id)
      if (!existedUser) {
    return false
      }
      const deletedUser = await this.userRepository.delete(id)
      return true

    }catch (err) {
      this.logger.error(err.message)
      throw new InternalServerErrorException(err.message)
    }
  }
}
