import { Fragment, ReactElement, useEffect, useState } from "react";
import PageLink from "../../../types/PageLink";
import { GiMagicBroom } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";
import { MapAll as MapRooms } from "../../../mapping/room";
import Room from "../../../models/Room";
import { default as Rooms } from "../table";
import { isSameDay } from "../../../extensions/Date";
import HousekeepingTask from "../../../models/HousekeepingTask";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import HousekeepingTaskModal, { CreateHousekeepingTaskModal } from "../../housekeepingtask/modal";
import roomsApi from "../../../api/rooms";
import housekeepingTasksApi from "../../../api/housekeepingTasks";

export default function Index(): ReactElement {
    const { scheduleId, id } = useParams();
    if(!scheduleId ) throw new Error("Schedule is undefined.");
    
    const navigate = useNavigate();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [modal, setModal] = useState<ReactElement>(<Fragment/>);
    const [monthYear, setMonthYear] = useState(new Date());

    useEffect(() => {
        roomsApi.get(parseInt(scheduleId))
            .then(rooms => {
                // filters out tasks that are not assigned to the housekeeper
                if(id) rooms.forEach(room => room.housekeepingTasks = room.housekeepingTasks?.filter(task => task.housekeeperId! === parseInt(id)));   
                setRooms(MapRooms(rooms));
            })
            .catch(error => console.log(error));

    }, [scheduleId, id, setRooms]);

    return(<>
        <div style={{borderRadius:"5px" }} className="p-3 m-3 mb-2 bg-primary d-flex flex-fill flex-row">
            <MonthYearSelector monthYear={monthYear} onChange={(d) => setMonthYear(d)} />
        </div>
        <div className="p-3 pb-0 d-flex flex-column flex-fill">
            <Rooms rooms={rooms} monthYear={monthYear} displayGuestNames={false} displayHousekeepingTasks={true} OnCellClick={onCellClick}/>
        </div>
        {modal}
    </>);

    function onCellClick(date: Date, room: Room): void {
        if(id) return;
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

        function onSaveNew(task: HousekeepingTask | undefined): void {
            if(!task){
                onHide();
            }
            else{
                housekeepingTasksApi.create(task)
                    .then(() => navigate(0));
            }
        }

        function onSaveExisting(task: HousekeepingTask | undefined, oldTask: HousekeepingTask): void {
            if(!task){
                housekeepingTasksApi.delete(oldTask)
                    .then(() => navigate(0));
            }
            else{
                housekeepingTasksApi.update(task)
                    .then(() => navigate(0));
            }
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
    params: '/:scheduleId/:id?'
}