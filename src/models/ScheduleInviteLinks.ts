import Schedule from "./Schedule";
import User from "./User";
import UserRoles from "./enums/UserRoles";

export default interface ScheduleInviteLink {
    id?: number;
    role?: UserRoles;
    code?: string;
    createdAt?: Date;
    expiresAt?: Date;
    redeemedAt?: Date;
    disabled?: boolean;

    userId?: number;
    user: User;
    note?: string;
    
    scheduleId?: number;
    schedule: Schedule;
}