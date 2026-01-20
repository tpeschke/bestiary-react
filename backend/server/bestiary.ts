// @ts-ignore
import express from 'express'
// @ts-ignore
import session from 'express-session'
// @ts-ignore
import passport from 'passport'
// @ts-ignore
import Auth0Strategy from 'passport-auth0'
// @ts-ignore
import bodyParser from 'body-parser'
// @ts-ignore
import cors from 'cors'
// @ts-ignore
import massive from 'massive'
// @ts-ignore
import path from 'path'

import { server, fakeAuth, collectMonsterCacheOn, domain, secret, callbackURL, clientID, clientSecret } from './server-config'

import { Response, Request } from './interfaces/apiInterfaces'

import authRoutesWithoutPassword from './routes/authentication'
import accessRoutes from './routes/access'
import playerRoutes from './routes/bestiary/player'
import catalogRoutes from './routes/bestiary/catalog'
import BeastRoutes from './routes/bestiary/beast'
import imageRoutes from './routes/bestiary/image'
import searchRoutes from './routes/bestiary/search'
import listRoutes from './routes/list'

import { collectCatalog } from './controllers/bestiary/catalog'
import { collectMonsterCache } from './controllers/bestiary/monsterCache'
import collectGearCache from './controllers/bestiary/gear/gear'
import { Profile } from './interfaces/apiInterfaces'
import { createUser, findSession, findUser } from './db/user/basicSQL'
import query from './db/database'
import obstaclesCatalog from './routes/obstacles/obstaclesCatalog'
import { collectObstacleCatalog } from './controllers/obstacleIndex/ObstacleCatalog'
import obstacleRoutes from './routes/obstacles/obstacles'
import challengeRoutes from './routes/obstacles/challenges'

const app = express()
app.use(bodyParser.json({ limit: '10mb' }))
app.use(cors())

app.use(session({
    secret,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain,
    clientID,
    clientSecret,
    callbackURL,
    scope: 'openid profile'
}, async (accessToken: string, refreshToken: string, extraParams: Object, profile: Profile, finishingCallback: Function) => {
    accessToken; refreshToken; extraParams;
    const { displayName, user_id: userID } = profile;
    const [user] = await query(findUser, userID)
    if (!user) {
         await query(createUser, [displayName, userID])
    }
    return finishingCallback(null, user.id)
}))

passport.serializeUser((id: any, done: any) => {
    done(null, id)
})
passport.deserializeUser(async (id: any, done: any) => {
    const [user] = await query(findSession, id)
    done(null, user);
})

// ================================== \\
app.use(fakeAuth)

app.use('/auth', authRoutesWithoutPassword(passport))

app.use('/access', accessRoutes)

app.use('/catalog', catalogRoutes)
app.use('/info', BeastRoutes)
app.use('/player', playerRoutes)
app.use('/searchAPI', searchRoutes)
app.use('/image', imageRoutes)

app.use('/lists', listRoutes)

app.use('/obstacles-catalog', obstaclesCatalog)
app.use('/obstacle', obstacleRoutes)
app.use('/challenge', challengeRoutes)

// ================================== \\

app.use(express.static(__dirname + `/../../app/dist`));
app.get('/*', (_: Request, response: Response) => {
    response.sendFile(path.join(__dirname + '/../../app/dist/index.html'))
})

// ================================== \\

app.listen(server, async () => {
    const gearCache = await collectGearCache()
    app.set('gearCache', gearCache)

    collectCatalog()
    if (collectMonsterCacheOn) {
        collectMonsterCache(gearCache)
    }

    collectObstacleCatalog()

    console.log(`Sing to me a sweet song of forgetfulness and I'll die on your shore ${server}`)
})