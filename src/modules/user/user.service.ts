import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/plugins/database/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}


 async removeMoneyFromUser(id: number, amount: number): Promise<any> {
    const user = await this.findOne(id);

    if (user) {
      if(!(user.money < amount)){
        user.money -= amount;
        await this.update({ id: id }, { money: user.money })
      }else{
      throw new Error(`Don't have enough money`);        
      }
    } else {
      throw new Error(`User with id not found`);
    }

   
  }

  async addMoneyToUser(id: number, amount: number): Promise<any> {
    const user = await this.findOne(id);

    if (user) {      
        user.money = Number(user.money) + Number(amount);
        await this.update({ id: id }, { money: user.money })      
    } else {
      throw new Error(`User with id not found`);
    }

    
  }

 async returnMoney(id: any): Promise<any>{
  const userMoney = await this.prismaService.user.findFirst({
    where: {
      id : 1,
    },
    select:{
      money: true,
    }    
  });
 

  const money = userMoney.money

  return money
}

  async create(data: any): Promise<any> {    

    const userExists = await this.prismaService.user.findFirst({
      where: {
        name: data.name,
      },
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const user = this.prismaService.user.create({
      data,
    });

    return user;
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }  

  async findOne(id: any) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: 1,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: any, data: any) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: 1,
      },
    });

    if (!userExists) {
      throw new NotFoundException('User does not exist');
    }   

    await this.prismaService.user.update({
      data,
      where: {
        id: 1,
      },
    });
  }

  async remove(id: any) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        id: 1,
      },
    });

    if (!userExists) {
      throw new NotFoundException('User does not exist');
    }

    await this.prismaService.user.delete({
      where: {
        id: 1,
      },
    });
  }
  
}
