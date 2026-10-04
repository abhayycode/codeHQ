import express, { Request, Response } from 'express';
import { db } from '../../db';

const userRouter = express.Router();

userRouter.get('/user/:id', async (req: Request, res: Response) => {
  const userId = Number(req.params.id);

  if (Number.isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user id' });
  }

  const user = await db.query.usersTable.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json(user);
});

export default userRouter;
