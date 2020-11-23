#Movie Wiki

Nesse projeto foi desenvolvido um Website para consultas de filmes e seriados, 
nele foi usado o axios para consultar uma api especializada em filmes e séries.

###Objetivo do projeto


Funcionalidade do MovieWiki:

* Listar Filmes populares (HOME)
* Listar Filmes por Data de lançamento
* Listar Séries por Data de lançamento
* Campo pesquisa para consultar um filme especifico
* Lista de favoritos

###Pré-Requisitos
Para rodar o projeto é necessário ter instalado em seu computador NodeJS

NPM: [Node-Installer](https://nodejs.org/)

###Como executá-lo?

Primeiramente faça o clone do nosso repositorio do projeto:
```
  git clone https://github.com/guilhermeconstantinov/MovieWiki.git
```

Para usar a aplicação é necessario usar uma key de autenticação do themovieDB:

Criar uma conta no [ThemovieDB](https://www.themoviedb.org/)


Para executar o projeto necessário criar um arquivo **.env** e adicionar a key do **ThemovieDB** no lugar das aspas:
```
    VUE_APP_API_KEY="Key themovieDB"
```

Após fazer todas os configurações basta acessar usando um terminal a pasta do baixada e rodar o seguinte comando:
```
    npm i
```
aguarde a instalação de todas as dependências, esse processo pode ser demorado

Agora para executar o servidor é necessário o seguinte comando:
```
    npm run serve
```

Pronto agora o servidor deve estar funcionando corretamente.

