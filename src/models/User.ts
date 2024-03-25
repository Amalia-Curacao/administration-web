import HousekeepingTask from "./HousekeepingTask";
import ScheduleInviteLinks from "./ScheduleInviteLinks";

export default interface User {
    id?: number;
    auth0?: string;
    firstName?: string;
    lastName?: string;
    note?: string;
    tasks?: HousekeepingTask[];
    invites?: ScheduleInviteLinks[];
}