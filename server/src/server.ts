import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minute-to-hour-string";

const app = express();
app.use(express.json());
app.use(cors())
const prisma = new PrismaClient({
  log: ["query"],
});

// Listagem de games com contagem de anúncios
app.get("/games", async (resquest, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  return response.json(games);
});

// Listagem de anúncios por game (game específico)
app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    })
  );
});

// Buscar o discord pelo ID do anúncio
app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return response.json({
    discord: ad.discord,
  });
});

// Criação de novo anúncio
app.post("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;
  const body: any = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return response.status(201).json(ad);
});

app.listen(3333);

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
