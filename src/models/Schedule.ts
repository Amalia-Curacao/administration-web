import Room from "./Room";
import ScheduleInviteLink from "./ScheduleInviteLinks";
import UserRoles from "./enums/UserRoles";

interface Schedule{
    id?: number;
    name?: string;
    role?: UserRoles;
    rooms?: Room[];
    inviteLinks?: ScheduleInviteLink[];
}

export default Schedule;