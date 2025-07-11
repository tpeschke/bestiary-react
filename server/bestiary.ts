import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import massive from 'massive'
import path from 'path'

import { Response } from './interfaces/apiInterfaces'

import { server, databaseCredentials, fakeAuth, collectMonsterCacheOn } from './server-config'

import authRoutes from './routes/authentication'
import accessRoutes from './routes/access'
import playerRoutes from './routes/player'
import ownerEditRoutes from './routes/ownerEdit'
import catalogRoutes from './routes/catalog'
import BeastRoutes from './routes/beast'

import { getDatabaseConnectionViaApp } from './utilities/databaseConnection'
import { collectCatalog } from './controllers/catalog'
import { collectMonsterCache } from './controllers/monsterCache'
import collectGearCache from './controllers/gear/gear'
import searchRoutes from './routes/search'

const app = express()
app.use(bodyParser.json({ limit: '10mb' }))
app.use(cors())

// app.use(express.static(__dirname + `/../dist/bestiary`));

// ================================== \\
app.use(fakeAuth)

app.use('/', authRoutes)
app.use('/catalog', catalogRoutes)
app.use('/access', accessRoutes)
app.use('/player', playerRoutes)
app.use('/searchAPI', searchRoutes)

app.use('/info', BeastRoutes)

app.use('/ownerEdit', ownerEditRoutes)

// ================================== \\

app.get('/*', (request: Request, response : Response) => {
    // response.sendFile(path.join(__dirname + '/../dist/bestiary/index.html'))
})

// ================================== \\

massive(databaseCredentials).then(dbI => {
    app.set('db', dbI)
    app.listen(server, () => {
        const databaseConnection = getDatabaseConnectionViaApp(app)

        collectCatalog(databaseConnection)
        if (collectMonsterCacheOn) {
            collectMonsterCache(databaseConnection)
        }

        collectGearCache()
        
        console.log(`Sing to me a sweet song of forgetfulness and Ill die on your shore ${server}`)
    })
}).catch(e => console.log('DB connection error', e))