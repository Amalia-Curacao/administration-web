import Room from "./Room";
import Schedule from "./Schedule";
import Housekeeper from "./Housekeeper";
import HousekeepingTaskType from "./HousekeepingTaskType";

export default interface HousekeepingTask {
    date?: Date,
    roomNumber?: number,
    roomScheduleId?: number,
    room?: Room,
    scheduleId?: number,
    schedule?: Schedule,
    type?: HousekeepingTaskType,
    housekeeperId?: number,
    housekeeper?: Housekeeper
}