import { Fragment, ReactElement, useEffect, useState } from "react";
import PageLink from "../../../types/PageLink";
import { GiMagicBroom } from "react-icons/gi";
import { useParams } from "react-router-dom";
import { MapAll as MapRooms } from "../../../mapping/room";
import Room from "../../../models/Room";
import axios from "axios";
import { default as Rooms } from "../table";
import { isSameDay } from "../../../extensions/Date";
import HousekeepingTask from "../../../models/HousekeepingTask";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import Housekeeper from "../../../models/Housekeeper";


export default function Index(): ReactElement {
    const { id } = useParams();
    if(!id) throw new Error("Housekeeper is undefined.");
    const [housekeeper, setHousekeeper] = useState<Housekeeper>();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [modal, setModal] = useState<ReactElement>(<Fragment/>);
    const [monthYear, setMonthYear] = useState(new Date());

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/Housekeepers/Get/" + id)
        .then(async response => {
            setHousekeeper(response.data as Housekeeper);
        })
        .then(() => 
            axios.get(process.env.REACT_APP_API_URL + "/Rooms/Get/" + housekeeper?.scheduleId)
            .then(async response => {
                setRooms(MapRooms(response.data as Room[]));
            })
            .catch(error => console.log(error)))
        .catch(error => console.log(error));

        
    }, [housekeeper?.scheduleId, id, setRooms, setHousekeeper]);

    return(<>
        <div style={{borderRadius:"5px" }} className="p-3 m-3 mb-2 bg-primary d-flex flex-fill flex-row">
            <MonthYearSelector monthYear={monthYear} onChange={(d) => setMonthYear(d)} />
        </div>
        <div className="p-3 pb-0 d-flex flex-column flex-fill">
            <Rooms rooms={rooms} monthYear={monthYear} displayGuestNames={false} displayHousekeepingTasks={true} On={onCellClick}/>
        </div>
        {modal}
    </>);

    function onCellClick(date: Date, room: Room): void {
        const task = (room.housekeepingTasks ?? []).find(task => isSameDay(task.date!, date));
        if(!task) {
            setModal(<CreateHousekeepingTaskModal date={date} room={room} onSave={onSaveNew} onHide={onHide}/>)
        }
        else {
            setModal(<HousekeepingTaskModal task={task} onSave={(t) => onSaveExisting(t, task)} onHide={onHide}/>)
        }

        function onHide(): void{
            setModal(<Fragment/>);
        }

        function onSaveNew(task: HousekeepingTask): void {
            setRooms(rooms.map(r => {
                if(r.number === room.number){
                    r.housekeepingTasks = [...(r.housekeepingTasks ?? []), task];
                }
                return r;
            }));
            onHide();
        }

        function onSaveExisting(task: HousekeepingTask, oldTask: HousekeepingTask): void {
            setRooms(rooms.map(r => {
                if(r.number === room.number){
                    r.housekeepingTasks = [...(r.housekeepingTasks ?? []).filter(t => t !== oldTask), task];
                }
                return r;
            }));
            onHide();
        }
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

export const page: PageLink = {
    icon: <GiMagicBroom/>    ,
    route: '/housekeeper/tasks',
    element: <Index/>,
    params: '/:id'
}