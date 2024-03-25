import Room from "./Room";
import ScheduleInviteLinks from "./ScheduleInviteLinks";

interface Schedule{
    id?: number;
    name?: string;
    rooms?: Room[];
    inviteLinks?: ScheduleInviteLinks[];
}

export default Schedule;