import express from "express";

const app = express()

// Listagem de games com contagem de anúncios
app.get('/games', (resquest, response) => {
    return response.json([])
})

// Criação de novo anúncio
app.post('/ads', (request, response) => {
    return response.status(201).json([])
})

// Listagem de anúncios por game (game específico)
app.get('/games/:id/ads', (request, response) => {
    return response.json([
        {id: 1, name: "Anúncio 1"},
        {id: 2, name: "Anúncio 2"},
        {id: 3, name: "Anúncio 3"},
        {id: 4, name: "Anúncio 4"},
        {id: 5, name: "Anúncio 5"},
        {id: 6, name: "Anúncio 6"},
    ])
})

// Buscar o discord pelo ID do anúncio
app.get('/ads/:id/discord', (request, response) => {
    return response.json([])
})

app.listen(3333)

/* 
HTTP Method
- Get: Buscar/Ler uma entidade
- Post: Criar uma entidade
- Put: Alterar informações da entidade
- Patch: Alterar uma informação específica da entidade
- Delete: Deleter uma entidade

HTTP Code
- 200: Em caso de sucesso
- 300: Em caso de redirecionamento
- 400: Em caso de erro do Cliente
- 500: Em caso de erro do Servidor

Params
- Query: Quando precisa persistir estados, sendo utilizado: filtros, ordenação, paginação, etc
- Route: Quando precisa fazer uma identificação de algum recurso
- Body: Quando precisa enviar uma ou várias informações em uma requisição
*/