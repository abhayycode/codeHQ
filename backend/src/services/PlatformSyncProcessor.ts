import { eq, sql } from 'drizzle-orm';
import { db } from '../db';
import { platform_snapshot, submission_activity } from '../db/schema';

class PlatformSyncProcessor {
  public platformId: number | null;
  public plt_username: string | null;

  constructor() {
    this.platformId = null;
    this.plt_username = null;
  }

  async process(platformId: number, plt_username: string) {
    this.platformId = platformId;
    this.plt_username = plt_username;

    /* 
      TODO:
      1. Bring the transformer method which will transform the data in the common schema way.
      2. bring the seperate method for update platform_snapshot and submission activity
    */
    await this.processLeetcode();
  }

  async processLeetcode() {
    const platformId = this.platformId;

    if (platformId == null) {
      throw new Error('platform id required');
    }

    const res = await fetch(
      `https://alfa-leetcode-api.onrender.com/${this.plt_username}/profile`,
    );

    const data = await res.json();

    const exists = await db.query.platform_snapshot.findFirst({
      where: {
        platform_id: platformId,
      },
    });

    if (exists) {
      await db
        .update(platform_snapshot)
        .set({
          easy: data.easySolved || 0,
          medium: data.mediumSolved || 0,
          hard: data.hardSolved || 0,
          total_solved: data.totalSolved || 0,
          date: new Date().toISOString().slice(0, 10),
        })
        .where(eq(platform_snapshot.platform_id, platformId))
        .returning();
    } else {
      await db.insert(platform_snapshot).values({
        easy: data.easySolved || 0,
        medium: data.mediumSolved || 0,
        hard: data.hardSolved || 0,
        total_solved: data.totalSolved || 0,
        date: new Date().toISOString().slice(0, 10),
        platform_id: platformId,
      });
    }

    const submissions = Object.entries(data.submissionCalendar).map(
      ([key, value]) => ({
        date: new Date(Number(key) * 1000).toISOString().slice(0, 10),
        count: Number(value),
        platform_id: platformId,
      }),
    );

    await db
      .insert(submission_activity)
      .values(submissions)
      .onConflictDoUpdate({
        target: [submission_activity.platform_id, submission_activity.date],
        set: { count: sql`excluded.count` },
      });
  }
}

export default new PlatformSyncProcessor();
