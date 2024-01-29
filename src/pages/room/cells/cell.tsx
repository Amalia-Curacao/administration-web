import { Fragment, ReactElement } from "react";
import { isSameDay, oldest } from "../../../extensions/Date";
import Reservation from "../../../models/Reservation";
import Room from "../../../models/Room";
import { CheckInCell } from "./checkIn";
import { CheckOutCell } from "./checkOut";
import { OccupiedCell } from "./occupied";
import { OnoccupiedCell } from "./onoccupied";
import HousekeepingTask from "../../../models/HousekeepingTask";
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

    On(reservation: Reservation, task: HousekeepingTask): {
        occupy: VoidFunction,
        onoccupied: VoidFunction,
        checkIn: VoidFunction,
        checkOut: VoidFunction,
    }
}

export default function Cell({room, current, displayGuestNames, displayHousekeepingTasks, On}: Props): ReactElement {
    const occupy: Reservation[] =  (room.reservations ?? []).filter(r => (r.checkIn! <= current) && (r.checkOut! >= current));
    const checkIn = occupy.find(r => isSameDay(r.checkIn!, current));
    const checkOut = occupy.find(r => isSameDay(r.checkOut!, current));
    const task = (room.houseKeepingTasks ?? []).find(t => isSameDay(t.date!, current))
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
            const reservation: Reservation = {
                checkIn: current,
                roomType: room.type,
                room: room,
                roomNumber: room.number,
                roomScheduleId: room.scheduleId,
                schedule: room.schedule,
                scheduleId: room.scheduleId,
            } as Reservation;
            return (<OnoccupiedCell onClick={() => On(reservation, task).onoccupied()} shape={shape}/>);
        }
    
        function CheckIn(): ReactElement {
            return (<CheckInCell onClick={() => On(checkIn!, task).checkIn()}/>);
        }
    
        function CheckOut(): ReactElement {
            return (<CheckOutCell onClick={() => On(checkOut!, task).checkOut()}/>);
        }
    
        function Occupied(): ReactElement {
            return(<OccupiedCell onClick={() => On(occupy[0]!, task).occupy()} guestName={GuestName(occupy[0], current)}/>);
            
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