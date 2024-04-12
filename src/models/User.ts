import HousekeepingTask from "./HousekeepingTask";
import ScheduleInviteLink from "./ScheduleInviteLinks";

export default interface User {
    id?: number;
    auth0?: string;
    firstName?: string;
    lastName?: string;
    tasks?: HousekeepingTask[];
    invites?: ScheduleInviteLink[];
    // not mapped in the database
    note?: string;
}