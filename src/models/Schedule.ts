import Room from "./Room";
import ScheduleInviteLinks from "./ScheduleInviteLinks";
import UserRoles from "./enums/UserRoles";

interface Schedule{
    id?: number;
    name?: string;
    role?: UserRoles;
    rooms?: Room[];
    inviteLinks?: ScheduleInviteLinks[];
}

export default Schedule;