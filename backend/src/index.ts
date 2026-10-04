import express, { Response } from 'express';

import userRouter from './routes/user';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(userRouter);

/* ------------------- health status ------------------- */
app.get('/', (_, res: Response) => {
  res.status(200).json({
    msg: 'Healthy',
  });
});

/* ------------------- server ------------------- */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
