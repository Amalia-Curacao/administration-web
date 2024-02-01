import HousekeepingTask from "./HousekeepingTask";
import Schedule from "./Schedule";

export default interface Housekeeper {
    id?: number;
    firstName?: string;
    lastName?: string;
    note?: string;
    tasks?: HousekeepingTask[];
    scheduleId?: number;
    schedule?: Schedule;
}