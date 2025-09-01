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

import { server, databaseCredentials, fakeAuth, collectMonsterCacheOn, domain, secret, callbackURL, clientID, clientSecret } from './server-config'

import { Error, Response, Request } from './interfaces/apiInterfaces'

import authRoutesWithoutPassword from './routes/authentication'
import accessRoutes from './routes/access'
import playerRoutes from './routes/player'
import catalogRoutes from './routes/catalog'
import BeastRoutes from './routes/beast'

import { getDatabaseConnectionViaApp } from './utilities/databaseConnection'
import { collectCatalog } from './controllers/catalog'
import { collectMonsterCache } from './controllers/monsterCache'
import collectGearCache from './controllers/gear/gear'
import searchRoutes from './routes/search'
import listRoutes from './routes/list'
import { Profile } from './interfaces/apiInterfaces'

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
    const [user] = await getDatabaseConnectionViaApp(app).user.find(userID)
    if (!user) {
        await getDatabaseConnectionViaApp(app).user.create(displayName, userID)
    }
    return finishingCallback(null, user.id)
}))

passport.serializeUser((id: any, done: any) => {
    done(null, id)
})
passport.deserializeUser(async (id: any, done: any) => {
    const [user] = await getDatabaseConnectionViaApp(app).user.findSession(id)
    done(null, user);
})

// ================================== \\
app.use(fakeAuth)

app.use('/auth', authRoutesWithoutPassword(passport))
app.use('/catalog', catalogRoutes)
app.use('/access', accessRoutes)
app.use('/player', playerRoutes)
app.use('/searchAPI', searchRoutes)
app.use('/lists', listRoutes)

app.use('/info', BeastRoutes)

// ================================== \\

app.use(express.static(__dirname + `/../../app/dist`));
app.get('/*', (request: Request, response: Response) => {
    response.sendFile(path.join(__dirname + '/../../app/dist/index.html'))
})

// ================================== \\

massive(databaseCredentials).then((dbI: any) => {
    app.set('db', dbI)
    app.listen(server, async () => {
        const databaseConnection = getDatabaseConnectionViaApp(app)

        await collectGearCache()

        collectCatalog(databaseConnection)
        if (collectMonsterCacheOn) {
            collectMonsterCache(databaseConnection)
        }

        console.log(`Sing to me a sweet song of forgetfulness and I'll die on your shore ${server}`)
    })
}).catch((e: Error) => console.log('DB connection error', e))