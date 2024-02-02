import { Fragment, ReactElement } from "react";
import { isSameDay, oldest } from "../../../extensions/Date";
import Reservation from "../../../models/Reservation";
import Room from "../../../models/Room";
import { CheckInCell } from "./checkIn";
import { CheckOutCell } from "./checkOut";
import { OccupiedCell } from "./occupied";
import { OnoccupiedCell } from "./onoccupied";
import HousekeepingTaskType from "../../../models/enums/HousekeepingTaskType";
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
    return(<td style={{overflow:"hidden"}} className={"p-0 d-flex flex-fill cell" + darken()}>
        <Reservation>
            <HousekeepingTask/>
        </Reservation>
    </td>);

    function Reservation({children}:{children: ReactElement}): ReactElement {
        switch(true) {
            case occupy.length === 0: 
                return (<Onoccupied shape="">{children}</Onoccupied>);
            case checkIn !== undefined && checkOut !== undefined: return(<>
                <CheckOut/>
                <CheckIn>{children}</CheckIn>
            </>);
            case checkIn !== undefined: return(<>
                <Onoccupied shape="L">{children}</Onoccupied>
                <CheckIn/>
            </>);
            case checkOut !== undefined: return(<>
                <CheckOut/>
                <Onoccupied shape="R">{children}</Onoccupied>
            </>);
            default:
                return (<Occupied>{children}</Occupied>);
        }

        function Onoccupied({shape, children}: {shape: string, children?: ReactElement}): ReactElement {
            return (<OnoccupiedCell onClick={onClick} shape={shape} classModification={darken()}>{children}</OnoccupiedCell>);
        }
    
        function CheckIn({children}: {children?: ReactElement}): ReactElement {
            return (<CheckInCell onClick={onClick} classModification={darken()}>{children}</CheckInCell>);
        }
    
        function CheckOut({children}: {children?: ReactElement}): ReactElement {
            return (<CheckOutCell onClick={onClick} classModification={darken()}>{children}</CheckOutCell>);
        }
    
        function Occupied({children}: {children?: ReactElement}): ReactElement {
            return(<OccupiedCell onClick={onClick} guestName={GuestName(occupy[0], date)} classModification={darken()}>{children}</OccupiedCell>);
            
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

    function darken(): string {
        return date.getDate() % 2 === 0 ? " darken " : "";
    }
}