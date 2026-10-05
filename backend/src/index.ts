import express, { Response } from 'express';
import { logger } from './lib/logger';
import pinoHttp from 'pino-http';

import userRouter from './routes/user';
import platformRouter from './routes/platform';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use((_, res: Response, next) => {
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    (res as any).locals.responseBody = body; // stash it
    return originalJson(body);
  };
  next();
});

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url,
          query: req.query,
          params: req.params,
          body: req.raw.body,
          headers: req.headers,
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
          body: res.raw.locals.responseBody,
        };
      },
    },
  }),
);

/* ------------------- routes ------------------- */
app.use('/user', userRouter);
app.use('/platform', platformRouter);

/* ------------------- health status ------------------- */
app.get('/api/health', (_, res: Response) => {
  res.status(200).json({
    msg: 'Healthy',
  });
});

/* ------------------- server ------------------- */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
