import { ReactElement } from "react";
import Reservation from "../../../models/Reservation";
import Room from "../../../models/Room";
import Cell from "./cell";
import HousekeepingTask from "../../../models/HousekeepingTask";
import "../../../scss/room.table.scss";

interface Props {
    room: Room,
    monthYear: Date,

    displayGuestNames: boolean,
    displayHousekeepingTasks: boolean,

    On(reservation: Reservation, task: HousekeepingTask): {
        occupy: VoidFunction,
        onoccupied: VoidFunction,
        checkIn: VoidFunction,
        checkOut: VoidFunction,
    }
}

export default function Cells({room, monthYear, displayGuestNames, displayHousekeepingTasks, On}: Props): ReactElement{
    const amount = new Date(monthYear.getFullYear(), monthYear.getMonth() + 1, 0).getDate();
    let days: ReactElement[] = [];

    for(let day = 1; day <= amount; day++) {
        const current: Date = new Date(monthYear.getFullYear(), monthYear.getMonth(), day);

        days.push(<Cell room={room} current={current} displayGuestNames={displayGuestNames} displayHousekeepingTasks={displayHousekeepingTasks} On={On}/>);
    }

    return(<tr className="d-flex flex-fill bg-secondary p-0">
        {days}
    </tr>);
}