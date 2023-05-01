# CRUD React

Esse projeto foi criado com as tecnologias: Node.js, Postgress, Prisma, Docker e React
Tem como objetivo construir um CRUD full-stack.

## Como rodar?
<br/>

### Backend

É necessário ter instalado o aplicativo Docker para rodar o banco de dados e montar a aplicação.
<br/>

Acesse a pasta backend pelo terminal e execute esse comando, para baixar as dependências dessa pasta: <br/>
<code> npm install </code> 
<br/>
<br/>

Com o aplicativo do Docker aberto, vá para a pasta docker no terminal e execute o comando: <br/>
<code> docker-compose up -d </code> <br/>
O container irá começar a ser construído
<br/>
<br/>

Volte para a pasta backend e execute: <br/>
<code> npx prisma migrate dev User </code> <br/>
O prisma irá criar a tabela User no banco de dados
<br/>
<br/>

Na pasta backend execute: <br/>
<code> npx prisma db seed </code> <br/>
Irá adicionar o usuário administrador no banco
<br/>
<br/>

Na pasta backend execute: <br/>
<code> npm run dev </code> <br/>
O servidor começará a rodar
<br/>
<br/>

<br/>

### Frontend

Acesse a pasta frontend pelo terminal e execute esse comando, para baixar as dependências dessa pasta: <br/>
<code> npm install </code> 
<br/>
<br/>

Na pasta frontend execute o comando: <br/>
<code> npm start </code> <br/>
O servidor começará a rodar
<br/>
<br/>

## Senha e email do administrador

PASSWORD_ADMIN="teste_tecnico_crud_react"
EMAIL_ADMIN="admin@hotmail.com"

## Atualizações futuras

Iniciar todo o projeto apenas executando o Docker Compose

