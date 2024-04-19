import { Fragment, ReactElement } from "react";
import { isSameDay, oldest } from "../../../extensions/Date";
import Reservation from "../../../models/Reservation";
import Room from "../../../models/Room";
import HousekeepingTaskType from "../../../models/enums/HousekeepingTaskType";
import { FaPlus } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import "../../../scss/room.table.scss";
import HousekeepingTask from "../../../models/HousekeepingTask";

interface Props {
    room: Room,
    current: Date,

    displayGuestNames: boolean,
    displayHousekeepingTasks: boolean,

    OnClick(date: Date, room: Room): void
}

export default function Cell({room, current: date, displayGuestNames, displayHousekeepingTasks, OnClick}: Props): ReactElement {
    const occupy: Reservation[] =  (room.reservations ?? []).filter(r => (r.checkIn! <= date) && (r.checkOut! >= date));
    const checkIn = occupy.find(r => isSameDay(r.checkIn!, date));
    const checkOut = occupy.find(r => isSameDay(r.checkOut!, date));
    const task : HousekeepingTask = (room.housekeepingTasks ?? []).find(t => isSameDay(t.date!, date))
        ?? {
                date: date,
                room: room, 
                roomNumber: room.number, 
                roomScheduleId: room.scheduleId
            };
    const className = "p-0 d-flex flex-fill no-decoration align-items-center justify-content-around" + darken();

    return(<td className={"d-flex flex-fill p-0 cell" + darken()}>{
        type().map((t, index) => 
            <button key={index} style={style(index, type().length)} className={className + t} onClick={() => OnClick(date, room)}>
                <HousekeepingTask/>
                <GuestName/>
            </button>)}
    </td>);

    function style(index: number, length: number): any {
        if(length === 1) return { };
        switch(index){
            case 0:
                return { marginRight: "-50%" };
            case 1:
                return { marginLeft: "-50%" };
            default:
                return { };
        }
    }

    function type(): string[] {
        switch(true) {
            case occupy.length === 0: 
                return ([" onoccupied "]);
            case checkIn !== undefined && checkOut !== undefined: 
                return([" check-out ", " check-in "]);
            case checkIn !== undefined: 
                return([" onoccupied ", " check-in "]);
            case checkOut !== undefined: 
                return([" check-out ", " onoccupied "]);
            default:
                return ([" occupied "]);
        }
    }

    function darken(): string {
        return date.getDate() % 2 === 0 ? " darken " : "";
    }
    
    function GuestName() : ReactElement {
        if(!displayGuestNames || occupy.length === 0) return(<Fragment/>);
        const occupied = occupy[0];
        const beginingOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const dayAfterCheckIn = new Date(occupied.checkIn!.getFullYear(), occupied.checkIn!.getMonth(), occupied.checkIn!.getDate() + 1);
        
        if(isSameDay(date, oldest(beginingOfMonth, dayAfterCheckIn))
            && occupied.guests!.length > 0) {
            return(<span className="guest-name">{occupied.guests![0].lastName!}</span>);
        }
        return(<Fragment/>);
    } 
    
    function HousekeepingTask({size}:{size?: string}): ReactElement {
        if( displayHousekeepingTasks === false ||
            task.type === undefined ||
            task.type === HousekeepingTaskType.None) return(<Fragment/>);
        
        size ??= "1.5em";
        const className = "housekeeping-task-icon";
        
        switch(true) {
            case task.type === HousekeepingTaskType.Towels: 
                return(<FaPlus size={size} className={className}/>);

            case task.type === HousekeepingTaskType.Bedsheets:
                return(<FaRegCircle size={size} className={className}/>);

            case task.type === HousekeepingTaskType.All:
                return(<>
                    <FaPlus size={size} className={className}/>
                    <FaRegCircle size={size} className={className}/>
                </>);

            default: return(<Fragment/>);
        }
        
    }
}