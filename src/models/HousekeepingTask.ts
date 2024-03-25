import Room from "./Room";
import Schedule from "./Schedule";
import User from "./User";
import HousekeepingTaskType from "./enums/HousekeepingTaskType";

export default interface HousekeepingTask {
    date?: Date,
    type?: HousekeepingTaskType,

    room?: Room,
    roomNumber?: number,
    roomScheduleId?: number,

    schedule?: Schedule,
    scheduleId?: number,
    
    housekeeper?: User
    housekeeperId?: number,
}