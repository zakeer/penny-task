import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../auth/dto/auth.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { API } from '../constants';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({}).exec();
  }

  async findAllPublic(): Promise<User[]> {
    return this.userModel.find({ isPublic: true }).exec();
  }

  async findByResetPasswordToken(token: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ resetPasswordToken: token }).exec();
  }

  async updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(API.AUTH.MESSAGES.USER_NOT_FOUND);
    }

    user.isPublic = updateUserDto.isPublic ?? user.isPublic;
    user.githubLink = updateUserDto.githubLink ?? user.githubLink;
    return user.save();
  }

}
