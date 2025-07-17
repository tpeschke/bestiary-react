import express from 'express'
import session from 'express-session'
import passport from 'passport'
import Auth0Strategy from 'passport-auth0'
import bodyParser from 'body-parser'
import cors from 'cors'
import massive from 'massive'
import path from 'path'
import { fileURLToPath } from 'url';

import { server, databaseCredentials, fakeAuth, collectMonsterCacheOn, domain, secret, callbackURL, clientID, clientSecret } from './server-config'

import authRoutesWithoutPassword from './routes/authentication'
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
    const { displayName, user_id: userID } = profile;
    const [user] = await getDatabaseConnectionViaApp(app).user.find(userID)
    if (!user) {
        await getDatabaseConnectionViaApp(app).user.create(displayName, userID)
    }
    return finishingCallback(null, user.id)
}))

passport.serializeUser((id, done) => {
    done(null, id)
})
passport.deserializeUser(async (id, done) => {
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

app.use('/ownerEdit', ownerEditRoutes)

// ================================== \\

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname + `/../dist`));

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