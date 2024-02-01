import { Fragment, ReactElement } from "react";
import { isSameDay } from "../../extensions/Date";
import Room from "../../models/Room";
import RoomType from "../../models/RoomType";
import { MdBedroomParent } from "react-icons/md";
import Cells from "./cells/cells";
import "../../scss/room.table.scss";

interface Props {
    rooms: Room[],
    monthYear: Date,

    displayGuestNames: boolean,
    displayHousekeepingTasks: boolean,
    
    OnCellClick(date: Date, room: Room): void
}

export default function Table({rooms, monthYear, displayGuestNames, displayHousekeepingTasks, OnCellClick}: Props): ReactElement {
    if(rooms.length === 0) return(<Fragment/>);
    const groupedRooms = groupByRoomType(rooms);

    return(<>
        { Object.keys(groupedRooms).map((roomType, index) => {
            return( <table key={roomType} className="table table-borderless mt-0 mb-0">
                <Dates index={index} monthYear={monthYear} roomType={roomType}/>
                <tbody>
                    { groupedRooms[roomType].map((r, index) => 
                    <tr style={{overflow:"visible"}} className="darken-on-hover" key={index}>
                        <td className="flipped text-center">{r.number}</td>
                        <Cells 
                            key={index} 
                            displayGuestNames={displayGuestNames}
                            displayHousekeepingTasks={displayHousekeepingTasks} 
                            monthYear={monthYear} 
                            room={r} 
                            OnCellClick={OnCellClick}/>
                    </tr>) }
                </tbody>
            </table>)})
        }
        <div className="table-end" style={{borderRadius:"0 0 5px 5px"}}/>
    </>);

    function groupByRoomType(rooms: Room[]): {[type: string]: Room[]} {
        let groupedRooms: {[type: string]: Room[]} = {};
        rooms.forEach(r => {
            if(!r.type) r.type = RoomType.None;
            if(groupedRooms[r.type] === undefined) groupedRooms[r.type] = [];
            groupedRooms[r.type].push(r);
            });
        return groupedRooms;
    }
}

function Dates({index, monthYear, roomType}: {index: number, monthYear: Date, roomType: string}): ReactElement {
    const totalAmountOfdays = new Date(monthYear.getFullYear(), monthYear.getMonth() + 1, 0).getDate();
    let days: ReactElement[] = [];
    const roundedEdges = index === 0;
    for(let i = 1; i <= totalAmountOfdays; i++) days.push(<Day key={i} day={i}/>);

    return(<thead>
        <tr>
            <td className="flipped" style={{fontSize:"16px", borderRadius: (roundedEdges ? "5px 0px 0px 0px" : "0px")}}>
                <MdBedroomParent/>
            </td>                            
            <tr className="d-flex p-0">{days}</tr>  
        </tr> 
        <tr>
            <th colSpan={2} className="pb-0 pt-0 align-middle">
                {roomType}
            </th>
        </tr>
    </thead>);

    function Day({day}: {day: number}): ReactElement {
        const date = new Date(monthYear.getFullYear(), monthYear.getMonth(), day);
        const cellClass = "d-flex flex-fill justify-content-center flex-column darken-on-hover p-2 bg-primary text-secondary";
        const colorClass = isSameDay(date, new Date()) ? " " : (date < new Date() ? " past" : " ") ;
        const borderRadius = roundedEdges && totalAmountOfdays === day ? "0px 5px 0px 0px" : "0px";

        return(<td style={{borderRadius: borderRadius}} className={cellClass + colorClass}>
            <span className="d-flex justify-content-center">
                {day}
            </span>
            <span style={{fontSize: "12px"}} className="d-flex justify-content-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]}
            </span>
        </td>);
    }
}


