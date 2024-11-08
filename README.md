<div style="display: flex; flex-direction: column; text-align: center;">
    <img style="margin: auto;" width="152" alt="EverShop Logo" src="https://firebasestorage.googleapis.com/v0/b/croc-show.appspot.com/o/logo%2Fv1%2FCROCSHOW%20-%20LOGO%20V1_Prancheta%201.png?alt=media&token=044492e2-b953-4731-b3db-08ea90dbe833" />
    <!-- 1405x425 -->
    <h1>Croc Show</h1>
    <img style="max-width: 1024px; margin: auto;" src="https://firebasestorage.googleapis.com/v0/b/croc-show.appspot.com/o/github%2Fcapa-github.png?alt=media&token=292c5ec8-9e23-49ec-899d-a5ba041f9759" alt="preview do site">
    <a style="text-decoration: none; text-transform: uppercase; font-size: 14px;" href="https://www.crocshow.com.br">www.crocshow.com.br</a>
</div>

## Sumário

- [\[Croc Show\]](#)
  - [Sumário](#sumário)
  - [Introdução](#introdução)
  - [Tecnologias Usadas](#tecnologias-usadas)
  - [Snapshots](#snapshots)
  - [Ambiente de desenvolvimento](#ambiente-de-desenvolvimento)
  - [Informações Técnicas](#informações-técnicas)
  - [Como Executar o Projeto](#como-executar-o-projeto)
  - [Contato](#contato)

## Introdução

Croc Show é uma plataforma de cardápio online com recursos essenciais de comércio e recebimentos de pedidos pelo Whatsapp. Construído com Next 14 e Firebase, também utiliza os conceitos de SSR, CSR e SSG.

## Tecnologias Usadas

![NextJS](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)&nbsp;
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)&nbsp;

## Ambiente de desenvolvimento

- Virtual Studio Code - Version 1.92.1
- GitHub Desktop - Version 3.4.3
- Node.js - Version 20.12.2
- Firebase

## Informações técnicas

- Utilizado Next 14 com App Router;
- Utilizado TypeScript;
- Feito as requisições e armazenamento no Firebase;
- Utilizado do Firebase as funções do Firestore Database, Storage e Authentication;
- Utilizado React Context para estado do carrinho de compras;
- Utilizado regras e padrões do Prettier;

## Snapshots

### Home

<img src="https://firebasestorage.googleapis.com/v0/b/croc-show.appspot.com/o/github%2Fhome.png?alt=media&token=223747b6-c533-4874-8d21-a432c0bf73dc" alt="Home" width="300" />

### Produtos

<img src="https://firebasestorage.googleapis.com/v0/b/croc-show.appspot.com/o/github%2Fprodutos.png?alt=media&token=eedb4c32-4502-4de4-883a-703e5af52a6c" alt="Lista de produtos" width="300" />

### Carrinho revisando pedido

<img src="https://firebasestorage.googleapis.com/v0/b/croc-show.appspot.com/o/github%2Fmodal-carrinho.png?alt=media&token=51684e37-b1e3-4e88-8efa-428d36d4292b" alt="Abrindo o modal do carrinho" width="300" />

### Carrinho adicionando endereço

<img src="https://firebasestorage.googleapis.com/v0/b/croc-show.appspot.com/o/github%2Fmodal-endereco.png?alt=media&token=65b714bb-2680-4ed4-ae27-03e95a1e24cb" alt="Adicionando o endereço para entrega" width="300" />

### Carrinho fazendo checkout

<img src="https://firebasestorage.googleapis.com/v0/b/croc-show.appspot.com/o/github%2Fmodal-checkout.png?alt=media&token=97dfb125-bdcc-4fb0-9f5f-a707a1f189b9" alt="Fazendo o checkout do pedido para whatsapp" width="300" />

### Pedido no Whatsapp

<img src="https://firebasestorage.googleapis.com/v0/b/croc-show.appspot.com/o/github%2Fpedido-whatsapp.jpg?alt=media&token=6a2ebba2-5a36-4246-b6f3-29801c5a2758" alt="Visualização do pedido recebido no whatsapp" height="400" />

### Login Administrador

<img src="https://firebasestorage.googleapis.com/v0/b/croc-show.appspot.com/o/github%2Flogin-adm.png?alt=media&token=4ba71435-906e-45d9-a098-41c7050d1e0d" alt="Tela de login do administrador" width="300" />

### Home Administração

<img src="https://firebasestorage.googleapis.com/v0/b/croc-show.appspot.com/o/github%2Fhome-adm.png?alt=media&token=f36d23f0-b9a2-4fc4-bfea-a786240e2832" alt="Home com login de administrador" width="300" />

### Cadastro de Produtos

<img src="https://firebasestorage.googleapis.com/v0/b/croc-show.appspot.com/o/github%2Fcadastro-cadastro.png?alt=media&token=593720bd-876a-4e8a-a766-6f27a4f06dca" alt="Cadastrando produtos" width="300" />

### Exclusão de Produtos

<img src="https://firebasestorage.googleapis.com/v0/b/croc-show.appspot.com/o/github%2Fexclusao-produto.png?alt=media&token=6b0b8881-7569-4b08-b1c0-334ca255624b" alt="Excluindo produtos" width="300" />

## Como Executar o Projeto

Para executar o projeto siga as instruções:

1. Clone o repositório:

```bash
git clone https://github.com/LucasDoGit/croc-show
cd croc-show
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as chaves de acesso ao seu Firebase (considerando que você ativou o Firestore Database, Storage e Authentication)

```javascript
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Firebase connection

NEXT_PUBLIC_FIREBASE_APIKEY=
NEXT_PUBLIC_AUTH_DOMAIN=
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_STORAGE_BUCKET=
NEXT_PUBLIC_MESSAGING_SENDER_ID=
NEXT_PUBLIC_APP_ID=
NEXT_PUBLIC_MEASUREMENT_ID=
```

4. use o comando abaixo para iniciar o projeto e aguarde.

```bash
npm run dev
```

5. Feito! O projeto deve ser iniciado e pode ser acesso usando um navegador pela url "http://localhost:3000"

## Contato

Para obter mais informações, entre em contato comigo em:

- Email: lucas.saiz19@gmail.com
- GitHub: https://github.com/LucasDoGit
