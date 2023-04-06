import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function CriaUsuario() {
    await prisma.user.create({
        data: {
            "name": "admin",
            "password": "tivic",
            "money" : 500,
        }
    }) 
}

async function main(){
    await CriaUsuario();   
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() =>{
    prisma.$disconnect();
})