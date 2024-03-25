import Schedule from "./Schedule";
import User from "./User";
import UserRoles from "./enums/UserRoles";

export default interface ScheduleInviteLinks {
    id?: number;
    role?: UserRoles;
    code?: string;
    createdAt?: Date;
    expiresAt?: Date;
    redeemedAt?: Date;
    disabled?: boolean;

    userId?: number;
    user: User;
    
    scheduleId?: number;
    schedule: Schedule;
}