class PlatformSyncProcessor {
  public platformId: Number | null;
  public plt_username: string | null;

  constructor() {
    this.platformId = null;
    this.plt_username = null;
  }

  async process(platformId: Number, plt_username: string) {
    this.platformId = platformId;
    this.plt_username = plt_username;

    this.processLeetcode();
  }

  /* TODO: here we need to make a call to https://alfa-leetcode-api.onrender.com/:plt_username/profile */
  async processLeetcode() {}
}

export default new PlatformSyncProcessor();
