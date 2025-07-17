import express from 'express'
import session from 'express-session'
import passport from 'passport'
import Auth0Strategy from 'passport-auth0'

import { secret, domain, clientID, clientSecret, callbackURL } from '../server-config'

export interface Profile {
    displayName: string,
    user_id: string
}

const authRoutes = express.Router()

authRoutes.use(session({
    secret,
    resave: false,
    saveUninitialized: true
}))
authRoutes.use(passport.initialize());
authRoutes.use(passport.session());

passport.use(new Auth0Strategy({
    domain,
    clientID,
    clientSecret,
    callbackURL,
    scope: 'openid profile'
}, async (accessToken: string, refreshToken: string, extraParams: Object, profile: Profile, finishingCallback: Function) => {
    const { displayName, user_id: userID } = profile;
    const db = authRoutes.get('db');
    const [ user ] = await db.find.user(userID)
    if (!user) {
        await db.create.user(displayName, userID)
    }
    return finishingCallback(null, user.id)
}))

authRoutes.get('/', passport.authenticate('auth0'));
authRoutes.get('/callback', passport.authenticate('auth0', {
    successRedirect: `/`
}));

passport.serializeUser((id : number, done : Function) => {
    done(null, id)
})
passport.deserializeUser(async (id : number, done : Function) => {
    const [ user ] = await authRoutes.get('db').user.findSession(id)
    return done(null, user);
})

export default authRoutes