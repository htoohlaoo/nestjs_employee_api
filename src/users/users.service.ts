import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    private  users = [
        {
          "id":1,
          "name": "John Doe",
          "email": "john.doe@example.com",
          "role": "ADMIN",
          "age": 30
        },
        {
          "id":2,
          "name": "Jane Smith",
          "email": "jane.smith@example.com",
          "role": "INTERN",
          "age": 25
        },
        {
          "id":3,
          "name": "Michael Johnson",
          "email": "michael.johnson@example.com",
          "role": "ENGINEER",
          "age": 35
        },
        {
          "id":4,
          "name": "Emily Brown",
          "email": "emily.brown@example.com",
          "role": "ADMIN",
          "age": 28
        },
        {
          "id":5,
          "name": "David Lee",
          "email": "david.lee@example.com",
          "role": "INTERN",
          "age": 22
        }
      ];
      
      findAll(role?:"ADMIN"|"ENGINEER"|"INTERN") {
        if(role){
          return this.users.filter((user)=>{return user.role==role})
        }
        return this.users.sort(((a,b)=>a.id-b.id))
      }
      findOne(id:number){
        const user = this.users.find(user=>user.id==id)
        return user
      }readonly
      create(userNew:CreateUserDto){
        const usersByHighestId = this.users.sort((a,b)=>b.id-a.id)[0] 
        const newUser = {id:usersByHighestId.id+1,...userNew}
        this.users.push(newUser);
        return newUser
      }
      update(id:number,updatedUser:UpdateUserDto){
        this.users= this.users.map(user=>{
            if(user.id==id){
                return {...user,...updatedUser}
            }
            return user
        })
        return this.users
      }
      

      delete(id:number){
        this.users = this.users.filter(user=>user.id!==id)
        const removedUser = this.findOne(id);
        return removedUser
      }
}
