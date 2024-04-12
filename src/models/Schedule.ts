import Room from "./Room";
import ScheduleInviteLink from "./ScheduleInviteLinks";
import UserRoles from "./enums/UserRoles";

interface Schedule{
    id?: number;
    name?: string;
    role?: UserRoles;
    owners?: string[];
    rooms?: Room[];
    inviteLinks?: ScheduleInviteLink[];
    ownerInviteCode?: string;
}

export default Schedule;