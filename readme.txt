----------INSTALACAO----------

clonar o projeto

instalar o node no pc
instalar o dbeaver
instalar o postgres

configurar o bd no dbeaver

npm install 

configurar .env (renomear ele, retirar o .example)
 
npx prisma migrate dev (gerar o bd)

npx prisma db seed(se o usuario nao for criado)

npx prisma studio (para visualizar BD)

npm run start:dev
