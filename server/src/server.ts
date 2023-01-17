//Backend API Restful utilizando o fastify(Semelhante ao express)
import Fastify from "fastify";
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client' //buscar o banco de dados

const port = 3001
const app = Fastify()
const prisma = new PrismaClient()

app.register(cors)

app.get('/habits', async () => {
   const habits = await prisma.habit.findMany({})
  return habits
})

app.listen({
  port
}).then(() => {
  console.log(`HTTP Server running on: http://localhost:${port}`)
})