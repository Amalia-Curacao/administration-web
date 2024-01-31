import Room from "./Room";
import Schedule from "./Schedule";
import Housekeeper from "./Housekeeper";
import HousekeepingTaskType from "./HousekeepingTaskType";

export default interface HousekeepingTask {
    date?: Date,
    type?: HousekeepingTaskType,

    room?: Room,
    roomNumber?: number,
    roomScheduleId?: number,

    schedule?: Schedule,
    scheduleId?: number,
    
    housekeeper?: Housekeeper
    housekeeperId?: number,
}