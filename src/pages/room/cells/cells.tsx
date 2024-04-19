import { ReactElement } from "react";
import Room from "../../../models/Room";
import Cell from "./cell";
import "../../../scss/room.table.scss";

interface Props {
    room: Room,
    monthYear: Date,

    displayGuestNames: boolean,
    displayHousekeepingTasks: boolean,

    OnCellClick(date: Date, room: Room): void
}

export default function Cells({room, monthYear, displayGuestNames, displayHousekeepingTasks, OnCellClick}: Props): ReactElement{
    const amount = new Date(monthYear.getFullYear(), monthYear.getMonth() + 1, 0).getDate();
    let days: ReactElement[] = [];

    for(let day = 1; day <= amount; day++) {
        const current: Date = new Date(monthYear.getFullYear(), monthYear.getMonth(), day);

        days.push(<Cell key={day} room={room} current={current} displayGuestNames={displayGuestNames} displayHousekeepingTasks={displayHousekeepingTasks} OnClick={OnCellClick}/>);
    }

    return(<tr className="d-flex flex-fill bg-secondary p-0">
        {days}
    </tr>);
}