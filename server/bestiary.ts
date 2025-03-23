import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import massive from 'massive'
import path from 'path'

import { Response } from './interfaces/apiInterfaces'

import { server, databaseCredentials, fakeAuth } from './server-config'

import authRoutes from './routes/authentication'
import accessRoutes from './routes/access'
import playerRoutes from './routes/player'

const app = express()
app.use(bodyParser.json({ limit: '10mb' }))
app.use(cors())

// app.use(express.static(__dirname + `/../dist/bestiary`));

// ================================== \\
app.use(fakeAuth)

app.use('/', authRoutes)
app.use('/access', accessRoutes)
app.use('/player', playerRoutes)

// ================================== \\

app.get('/*', (_, response : Response) => {
    // response.sendFile(path.join(__dirname + '/../dist/bestiary/index.html'))
})

// ================================== \\

massive(databaseCredentials).then(dbI => {
    app.set('db', dbI)
    app.listen(server, () => {
        console.log(`Sing to me a sweet song of forgetfulness and Ill die on your shore ${server}`)
    })
}).catch(e => console.log('DB connection error', e))