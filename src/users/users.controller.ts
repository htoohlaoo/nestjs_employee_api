import { Controller,Get,Post,Param,Body,Patch,Put, Delete, Query, ParseIntPipe, ValidationPipe, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService ){}
    @Get()
    findAll(@Query('role') role?:"ADMIN"|"ENGINEER"|"INTERN"){
        if(role) {
            const users = this.usersService.findAll(role)
            if(users.length === 0) throw new NotFoundException('User With Role: '+role+ " Not Found")
            return users
        }
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id:number){
        const user= this.usersService.findOne(id);
        if(!user) throw new NotFoundException("User Not Found")
        return user
    }

    @Post()
    create(@Body(ValidationPipe) user:CreateUserDto){
        return this.usersService.create(user)
    }

    @Patch(':id')
    updateOne(@Param('id',ParseIntPipe) id:number,@Body(ValidationPipe) userUpdate:UpdateUserDto){
        return this.usersService.update(id,userUpdate)
    }
    @Delete(':id')
    deleteOne(@Param('id',ParseIntPipe) id:number){
        return this.usersService.delete(id)
    }

}
