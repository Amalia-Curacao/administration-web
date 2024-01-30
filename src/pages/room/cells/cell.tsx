import { Fragment, ReactElement } from "react";
import { isSameDay, oldest } from "../../../extensions/Date";
import Reservation from "../../../models/Reservation";
import Room from "../../../models/Room";
import { CheckInCell } from "./checkIn";
import { CheckOutCell } from "./checkOut";
import { OccupiedCell } from "./occupied";
import { OnoccupiedCell } from "./onoccupied";
import HousekeepingTaskType from "../../../models/HousekeepingTaskType";
import { CiCirclePlus } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import "../../../scss/room.table.scss";

interface Props {
    room: Room,
    current: Date,

    displayGuestNames: boolean,
    displayHousekeepingTasks: boolean,

    On(date: Date, room: Room): void
}

export default function Cell({room, current, displayGuestNames, displayHousekeepingTasks, On}: Props): ReactElement {
    const occupy: Reservation[] =  (room.reservations ?? []).filter(r => (r.checkIn! <= current) && (r.checkOut! >= current));
    const checkIn = occupy.find(r => isSameDay(r.checkIn!, current));
    const checkOut = occupy.find(r => isSameDay(r.checkOut!, current));
    const task = (room.housekeepingTasks ?? []).find(t => isSameDay(t.date!, current))
        ?? {
                date: current,
                room: room, 
                roomNumber: room.number, 
                roomScheduleId: room.scheduleId, 
                schedule: room.schedule, 
                scheduleId: room.scheduleId,
            };

    return(<td style={{overflow:"hidden"}} className={"p-0 d-flex flex-fill cell" + (current.getDate() % 2 === 0 ? " darken " : "")}>
        <Reservation/>
        { displayHousekeepingTasks ? <HousekeepingTask/> : <Fragment/> }
    </td>);

    function Reservation(): ReactElement {
        const on = () => On(current, room);
        switch(true) {
            case occupy.length === 0: 
                return (<Onoccupied shape=""/>);
            case checkIn !== undefined && checkOut !== undefined: return(<>
                <CheckOut/>
                <CheckIn/>
            </>);
            case checkIn !== undefined: return(<>
                <Onoccupied shape="L"/>
                <CheckIn/>
            </>);
            case checkOut !== undefined: return(<>
                <CheckOut/>
                <Onoccupied shape="R"/>
            </>);
            default:
                return (<Occupied/>);
        }

        function Onoccupied({shape}: {shape: string}): ReactElement {
            return (<OnoccupiedCell onClick={on} shape={shape}/>);
        }
    
        function CheckIn(): ReactElement {
            return (<CheckInCell onClick={on}/>);
        }
    
        function CheckOut(): ReactElement {
            return (<CheckOutCell onClick={on}/>);
        }
    
        function Occupied(): ReactElement {
            return(<OccupiedCell onClick={on} guestName={GuestName(occupy[0], current)}/>);
            
            function GuestName(occupied: Reservation | undefined, currentDate: Date) : string {
                if(!occupied) return("");
    
                const beginingOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                const dayAfterCheckIn = new Date(occupied.checkIn!.getFullYear(), occupied.checkIn!.getMonth(), occupied.checkIn!.getDate() + 1);
                
                if(isSameDay(currentDate, oldest(beginingOfMonth, dayAfterCheckIn))) {
                    return( occupied.guests!.length > 0 && displayGuestNames
                            ? occupied.guests![0].lastName!
                            : "" );
                }
                return("");
            } 
        }
    }    

    function HousekeepingTask(): ReactElement {        
        switch(task.type){
            case HousekeepingTaskType.Towels: 
                return(<FaPlus/>);
            case HousekeepingTaskType.Bedsheets:
                return(<FaRegCircle/>);
            case HousekeepingTaskType.All:
                return(<CiCirclePlus/>);
            default: return(<Fragment/>);
        }
    }
}