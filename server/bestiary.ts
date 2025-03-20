import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import massive from 'massive'
import session from 'express-session'
import passport from 'passport'
import Auth0Strategy from 'passport-auth0'
import path from 'path'

import { Profile, Response } from './interfaces'

import { sendErrorForwardNoFile } from './helpers/sendingFunctions'

import { server, databaseCredentials, secret, domain, clientID, clientSecret, callbackURL, fakeAuth } from './server-config'

const sendErrorForward = sendErrorForwardNoFile('main server')

const app = express()
app.use(bodyParser.json({ limit: '10mb' }))
app.use(cors())

app.use(express.static(__dirname + `/../dist/bestiary`));

// ================================== \\

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
    const db = app.get('db');
    const [ user ] = await db.find.user(userID)
    if (!user) {
        await db.create.user(displayName, userID)
    }
    return finishingCallback(null, user.id)
}))

app.use(fakeAuth)

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: `/`
}));

passport.serializeUser((id : number, done : Function) => {
    done(null, id)
})
passport.deserializeUser(async (id : number, done : Function) => {
    const [ user ] = await app.get('db').user.findSession(id)
    return done(null, user);
})

// ================================== \\

app.get('/*', (_, response : Response) => {
    response.sendFile(path.join(__dirname + '/../dist/bestiary/index.html'))
})

// ================================== \\

massive(databaseCredentials).then(dbI => {
    app.set('db', dbI)
    app.listen(server, () => {
        console.log(`Sing to me a sweet song of forgetfulness and Ill die on your shore ${server}`)
    })
}).catch(e => console.log('DB connection error', e))