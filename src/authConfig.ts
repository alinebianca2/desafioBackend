import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import session from 'express-session';
import { Express } from 'express';

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: 'https://searchcityregion.azurewebsites.net/auth/github/callback',
}, (_accessToken: any, _refreshToken: any, profile: any, done: (arg0: null, arg1: any) => any) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

export const configurePassport = (app: Express) => {
  app.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: true,
  }));

  app.use(passport.initialize());
  app.use(passport.session());
};
