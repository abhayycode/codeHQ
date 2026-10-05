import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	platforms: {
		user: r.one.users({
			from: r.platforms.userId,
			to: r.users.id
		}),
		platfornSnapshots: r.many.platfornSnapshot(),
		submissionActivities: r.many.submissionActivity(),
	},
	users: {
		platforms: r.many.platforms(),
	},
	platfornSnapshot: {
		platform: r.one.platforms({
			from: r.platfornSnapshot.platformId,
			to: r.platforms.id
		}),
	},
	submissionActivity: {
		platform: r.one.platforms({
			from: r.submissionActivity.platformId,
			to: r.platforms.id
		}),
	},
}))