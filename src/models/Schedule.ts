import Housekeeper from "./Housekeeper";
import HousekeepingTask from "./HousekeepingTask";
import Reservation from "./Reservation";
import Room from "./Room";

interface Schedule{
    id: number | undefined;
    name: string | undefined;
    rooms: Room[] | undefined;
    reservations: Reservation[] | undefined;
    housekeepers: Housekeeper[] | undefined;
    housekeepingTasks: HousekeepingTask[] | undefined;
}

export default Schedule;