import { ReactElement, useEffect, useState } from "react";
import { GrSchedules } from "react-icons/gr";
import SaveButton from "../../components/saveButton";
import "../../extensions/HTMLElement";
import Schedule from "../../models/Schedule";
import PageLink from "../../types/PageLink";
import PageState from "../../types/PageState";
import CreateSchedule from "./create";
import ScheduleRow from "./row";
import PageTitle from "../../components/pageTitle";
import schedulesApi from "../../api/schedules";

const _info = {name: "Schedules", icon: <GrSchedules/>};

function ScheduleMain(): ReactElement {   

    function onCreate(schedule: Schedule): void {
        schedulesApi.create(schedule.name!)
            .then(newS => setSchedules([...schedules, newS]));
    }

    function onDelete(schedule: Schedule): void {
        schedulesApi.delete(schedule.id!)
            .then(isDeleted => isDeleted ? setSchedules(schedules.filter(s => s.id !== schedule.id)) : console.log(""));
    }

    function onUpdate(schedule: Schedule): void{
        schedulesApi.update(schedule)
            .then(newS => setSchedules(schedules.map(s => s.id === schedule.id ? newS : s)))
    }

    let _state: PageState = PageState.Default;
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    useEffect(() => { schedulesApi.getAll().then(setSchedules) }, []);
    
    function Table(): ReactElement {
        const [creating, setCreating] = useState<boolean>(false);
        
        // #region Actions
        function createState(){
            if(_state !== PageState.Default) return;
            _state = PageState.Create;
            setCreating(true);
        }

        function onReturn() {
            _state = PageState.Default; 
            setCreating(false);
        }
        // #endregion

        return(<>
            <table className="table table-hover table-secondary">
                <thead className="h4">
                    <tr className="bg-secondary">
                        <th className="table-bordered bg-secondary">
                            <span className="text-dark">
                                Id
                            </span>
                        </th>
                        <th className="table-bordered bg-secondary">
                            <span className="text-dark">
                                Name
                            </span>
                        </th>
                        <th className="bg-secondary">
                            <button hidden={creating} onClick={createState} className="btn btn-outline-success float-end">
                                Add
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr hidden={!creating}>
                        <ScheduleRowCreate addSchedule={onCreate} onReturn={onReturn}/>
                    </tr>
                    {schedules.map(s => <ScheduleRow key={s.id} schedule={s} onEdit={onUpdate} onDelete={onDelete}/>)}
                </tbody>        
            </table>
        </>);
    }

    return(<>
        <div className="p-3 pe-3 d-flex flex-column flex-fill">
            <PageTitle name={_info.name} icon={_info.icon}/>
            <Table/>
        </div>
    </>);
}

function ScheduleRowCreate({onReturn, addSchedule}: {onReturn: VoidFunction, addSchedule: (schedule: Schedule) => void}): ReactElement {
        function onSave(): Schedule | undefined{
            const schedule = CreateSchedule().action();
            if(!schedule) return undefined;
            addSchedule(schedule);
            return schedule;
        }

        function onFailure() {
            console.log("error");
        }

        return(<>
            <td colSpan={1} className="bg-secondary"/>
            <td colSpan={1} className="bg-secondary rounded-0">
                {CreateSchedule().body}
            </td>
            <td colSpan={1} className="bg-secondary">
                <SaveButton onSave={onSave} onFailure={onFailure} onReturn={onReturn}/>
            </td>
        </>)
    }

export default ScheduleMain;
export const page: PageLink = {route: "/schedule", element: <ScheduleMain/>, icon: _info.icon};