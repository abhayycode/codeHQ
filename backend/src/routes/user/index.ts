import express, { Request, Response } from 'express';
import { db } from '../../db';
import { usersTable } from '../../db/schema';
import { logger } from '../../lib/logger';

const userRouter = express.Router();

userRouter.post('/create', async (req: Request, res: Response) => {
  try {
    const { username, email, name, password } = req.body;

    if (!username || !email || !name) {
      return res.status(400).json({
        msg: 'Please enter valid data',
      });
    }

    const userExist = await db.query.usersTable.findFirst({
      where: {
        OR: [
          {
            username,
          },
          {
            email,
          },
        ],
      },
    });

    if (userExist) {
      return res.status(409).json({
        msg: 'User with this email or username alredy exist',
      });
    }

    const userData = await db.insert(usersTable).values({
      email,
      name,
      username,
    });

    return res.status(200).json({
      data: userData,
    });
  } catch (error) {
    logger.error(error, 'Something went wrong while creating user');
    return res.status(400).json({
      error: 'Something went wrong',
    });
  }
});

userRouter.get('/user/:id', async (req: Request, res: Response) => {
  const userId = Number(req.params.id);

  if (Number.isNaN(userId)) {
    return res.status(404).json({ error: 'Invalid user id' });
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
