# Design Tokens - PODS

Repositório contendo os tokens globais do PODS.
Também contém os tokens das marcas:

- PO UI
- Fluig

**Esses design tokens fazem parte de um teste piloto e não tem relação direta com as marcas.**

## Gerando os tokens

Para executar os tokens, basta executar o seguinte comando `npm` no seu terminal:

```shell
npm run build
```

Depois de executar, deverá ser criado um novo repositório chamado `dist/`, com a seguinte estrutura:

```
dist
│  
└───brands
│   │
│   └───fluig
│   |   |   package.json
|   |   |
│   |   └───css
|   |   |
│   |   └───scss
|   | 
│   └───po-ui
│       |   package.json
|       |
│       └───css
│   
└───global
    │
    └───android
    |
    └───css 
    |
    └───ios
    |
    └───ios-swift
    |
    └───scss
```

Nesta estrutura também será gerado cada arquivo `package.json` para publicação individual dos pacotes. 

