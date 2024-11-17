import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import router from './router/index.js'
import { cors } from 'hono/cors'
import { config } from 'dotenv';
config()

const app = new Hono()

app.use('*', cors())
app.route('/', router)


const port = 3030
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
