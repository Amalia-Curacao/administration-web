import { Fragment, ReactElement } from "react";
import { isSameDay, oldest } from "../../../extensions/Date";
import Reservation from "../../../models/Reservation";
import Room from "../../../models/Room";
import { CheckInCell } from "./checkIn";
import { CheckOutCell } from "./checkOut";
import { OccupiedCell } from "./occupied";
import { OnoccupiedCell } from "./onoccupied";
import HousekeepingTaskType from "../../../models/HousekeepingTaskType";
import { FaPlus } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import "../../../scss/room.table.scss";

interface Props {
    room: Room,
    current: Date,

    displayGuestNames: boolean,
    displayHousekeepingTasks: boolean,

    OnClick(date: Date, room: Room): void
}

export default function Cell({room, current: date, displayGuestNames, displayHousekeepingTasks, OnClick}: Props): ReactElement {
    const onClick = () => OnClick(date, room);
    const occupy: Reservation[] =  (room.reservations ?? []).filter(r => (r.checkIn! <= date) && (r.checkOut! >= date));
    const checkIn = occupy.find(r => isSameDay(r.checkIn!, date));
    const checkOut = occupy.find(r => isSameDay(r.checkOut!, date));
    const task = (room.housekeepingTasks ?? []).find(t => isSameDay(t.date!, date))
        ?? {
                date: date,
                room: room, 
                roomNumber: room.number, 
                roomScheduleId: room.scheduleId, 
                schedule: room.schedule, 
                scheduleId: room.scheduleId,
            };
    // TODO add condition to add or remove light/darken class when the guest name is visible
    return(<td style={{overflow:"hidden"}} className={"p-0 d-flex flex-fill" + lightOrDark()}>
        <Reservation/>
        <HousekeepingTask/>
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
            return (<OnoccupiedCell onClick={onClick} shape={shape}/>);
        }
    
        function CheckIn(): ReactElement {
            return (<CheckInCell onClick={onClick}/>);
        }
    
        function CheckOut(): ReactElement {
            return (<CheckOutCell onClick={onClick}/>);
        }
    
        function Occupied(): ReactElement {
            return(<OccupiedCell onClick={onClick} guestName={GuestName(occupy[0], date)}/>);
            
            function GuestName(occupied: Reservation | undefined, currentDate: Date) : string {
                if(!occupied || !displayGuestNames) return("");
    
                const beginingOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                const dayAfterCheckIn = new Date(occupied.checkIn!.getFullYear(), occupied.checkIn!.getMonth(), occupied.checkIn!.getDate() + 1);
                
                if(isSameDay(currentDate, oldest(beginingOfMonth, dayAfterCheckIn))) {
                    return( occupied.guests!.length > 0
                            ? occupied.guests![0].lastName!
                            : "" );
                }
                return("");
            } 
        }
    }    

    function HousekeepingTask(): ReactElement {
        if( displayHousekeepingTasks === false ||
            task.type === undefined ||
            task.type === HousekeepingTaskType.None) return(<Fragment/>);

        return(<button className="bg-transparent no-decoration w-100 h-100" onClick={onClick} style={{position: "absolute", zIndex: "2"}}>
            <div className={"housekeeping-task-container"}>
                <Icon className={"housekeeping-task-icon"}/>
            </div>
        </button>)

        function Icon({className}: {className: string}): ReactElement {
            // if you change the size of the icon, you must also change the size of the container in the scss file room.table.scss
            const size = "1.5em";
            switch(true){
                case task.type === HousekeepingTaskType.Towels: 
                    return(<>
                        <FaPlus size={size} className={className}/>
                    </>);
                case task.type === HousekeepingTaskType.Bedsheets:
                    return(<>
                        <FaRegCircle size={size} className={className}/>
                    </>);
                case task.type === HousekeepingTaskType.All:
                    return(<>
                        <FaPlus size={size} className={className}/>
                        <FaRegCircle size={size} className={className}/>
                    </>);
                default: return(<Fragment/>);
            }
        }
    }

    function lightOrDark(): string {
        // this is to fix a visual bug with the guest name and houskeeping task icons
        const lighten = displayGuestNames ? " " : " lighten ";
        return date.getDate() % 2 === 0 ? " darken " : lighten;
    }
}