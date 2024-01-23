import { Fragment, ReactElement, useEffect, useState } from "react";
import "../../scss/room.table.scss";
import { MdBedroomParent } from "react-icons/md";
import PageLink from "../../types/PageLink";
import Room from "../../models/Room";
import RoomType from "../../models/RoomType";
import { useNavigate, useParams } from "react-router-dom";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import axios from "axios";
import {default as Rooms} from "./table";
import {MapAll as MapRooms} from "../../mapping/room";
import { pages } from "../../routes";

const _info = {name: "Rooms", icon: <MdBedroomParent/>};

function RoomIndexBody(): ReactElement {
    const { id, viewMode } = useParams();
    if(!id) throw new Error("Schedule ID is undefined.");
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/Rooms/Get/" + id)
        .then(async response => {
            setRooms(MapRooms(response.data as Room[]));
        })
        .catch(error => console.log(error));
    }, [id]);

    const navigate = useNavigate();
    const [monthYear, setMonthYear] = useState(new Date());
    const groupedRooms = groupByRoomType(rooms);

    return(<>
        {viewMode !== "housekeeping"  
            ?   <>
                <div style={{borderRadius:"5px" }} className="p-3 m-3 mb-2 bg-primary d-flex flex-fill flex-row">
                    <MonthYearSelector monthYear={monthYear} onChange={onMonthYearSelected}/>
                    <button onClick={() => navigate(pages["housekeeper index"].route + "/" + id)} className="btn btn-secondary btn-outline-primary float-end">Housekeeping</button>
                </div>
                </>
            :   <Fragment/>}
        <div className="p-3 pb-0 d-flex flex-column flex-fill">
            {Object.keys(groupedRooms).map((key, index) => 
                <Rooms key={index} monthYear={monthYear} roundedEdges={index === 0} rooms={groupedRooms[key]} allRooms={rooms} housekeeping={viewMode === "housekeeping"}/>)}
            <div className="table-end" style={{borderRadius:"0 0 5px 5px"}}/>
        </div>
    </>);
    
    function onMonthYearSelected(monthYear: Date): void {
        setMonthYear(monthYear);
    }
}

function MonthYearSelector({monthYear, onChange}: {monthYear: Date, onChange: (monthYear: Date) => void }): ReactElement {
    const arrowClass = "me-2 justify-content-center align-content-middle no-decoration bg-primary";
    return(
        <div className="d-flex flex-fill flex-row justify-content-center align-items-center">
            <button className={arrowClass} onClick={() => onChange(new Date(monthYear.getFullYear(), monthYear.getMonth() - 1, 1))}>
                <FaLongArrowAltLeft size={32} className="text-secondary"/>
            </button>
            <h5 className="text-center text-secondary me-2 ms-2">{monthYear.toLocaleString('default', { month: 'long' }) + " " + monthYear.getFullYear()}</h5>
            <button className={arrowClass} onClick={() => onChange(new Date(monthYear.getFullYear(), monthYear.getMonth() + 1, 1))}>
                <FaLongArrowAltRight size={32} className="text-secondary i-l"/>
            </button>
        </div>);
}

// #region Functions
function groupByRoomType(rooms: Room[]): {[type: string]: Room[]} {
    let groupedRooms: {[type: string]: Room[]} = {};
    rooms.forEach(r => {
        if(!r.type) r.type = RoomType.None;
        if(groupedRooms[r.type] === undefined) groupedRooms[r.type] = [];
        groupedRooms[r.type].push(r);
    });
    return groupedRooms;
}

// #endregion

export const page: PageLink = {
    icon: _info.icon,
    route: '/room',
    element: <RoomIndexBody/>,
    params: '/:id/:viewMode?'
};
