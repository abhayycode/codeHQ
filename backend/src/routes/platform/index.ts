import express, { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { platformsTable } from '../../db/schema';

const router = express.Router();

router.post('/update', async (req: Request, res: Response) => {
  let { plt_username, platformName } = req.body;

  if (!plt_username || !platformName) {
    return res.status(400).json({
      err: 'Invalid payload, username is required',
    });
  }

  const existing = await db.query.platformsTable.findFirst({
    where: {
      user_id: 1,
      platformName,
    },
  });

  /* if platform entry already exists update that else create a new entry */
  let platform;

  if (existing) {
    [platform] = await db
      .update(platformsTable)
      .set({
        platformName,
        userName: plt_username,
      })
      .where(eq(platformsTable.id, existing.id))
      .returning();
  } else {
    [platform] = await db
      .insert(platformsTable)
      .values({
        user_id: 1,
        platformName,
        userName: plt_username,
      })
      .returning();
  }

  return res.status(200).json({ data: platform });
});

export default router;
