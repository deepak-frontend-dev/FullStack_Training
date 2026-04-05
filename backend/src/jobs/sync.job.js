import cron from "node-cron";
import { syncMoviesService } from "../services/movie.service.js";

export const initSyncJob = () => {
    cron.schedule("0 * * * *", async () => {
        console.log("Running periodic movie sync");
        try {
            const inserted = await syncMoviesService("batman");
            console.log(`Sync completed. Inserted ${inserted} movies`);
        } catch (error) {
            console.error("Sync job failed:", error.message);
        }
    });

    console.log("Movie sync job initialized (1 hour interval)");
};
