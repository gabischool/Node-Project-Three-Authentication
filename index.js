// Import server here and start the application
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { author_routes } from './api/routes/author_routes.js'
import { owner_routes } from './api/routes/owner_routes.js';

const PORT = 9000;
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api', author_routes)
app.use('/api', owner_routes)

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})