import app from "./app.js";
import { initSyncJob } from "./jobs/sync.job.js";

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    initSyncJob();
})