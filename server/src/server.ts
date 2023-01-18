//Backend API Restful utilizando o fastify(Semelhante ao express)
import Fastify from "fastify";
import cors from '@fastify/cors'
import { appRoutes } from './routes';

const port = 3001
const app = Fastify()

app.register(cors)
app.register(appRoutes)

app.listen({ port }, function (err) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(`HTTP Server running on: http://localhost:${port}`)
})
  
  