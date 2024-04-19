import Room from "./Room";
import User from "./User";
import HousekeepingTaskType from "./enums/HousekeepingTaskType";

export default interface HousekeepingTask {
    date?: Date,
    type?: HousekeepingTaskType,

    roomNumber?: number,
    roomScheduleId?: number,
    room?: Room,
    
    housekeeperId?: number,
    housekeeper?: User
}