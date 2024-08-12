import express, { Express } from 'express';
import municipioRoutes from './routes/municipioRoutes.js';
import { configurePassport } from './authConfig.js';
import passport from 'passport';

const app: Express = express();

configurePassport(app);

app.use(express.json());

// ROTA_MUNICIPIO

app.use('/api', municipioRoutes);

// ROTAS_AUTENTICACAO_GITHUB

app.get(
  '/auth/github',
  passport.authenticate('github', {
    scope: ['user:email'],
  })
);

app.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;
