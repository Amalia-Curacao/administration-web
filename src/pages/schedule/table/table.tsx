import { ReactElement, useState, useEffect } from "react";
import SchedulesApi from "../../../api/schedules";
import Schedule from "../../../models/Schedule";
import TableHeader from "./header";
import { InputScheduleRow, ScheduleRow } from "./row";

export default function Table({schedulesApi} : {schedulesApi: SchedulesApi}): ReactElement {
    const [isCreating, setCreating] = useState<boolean>(false);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    useEffect(() => {
        if (schedulesApi) schedulesApi.get().then(s => setSchedules(s)).catch(e => console.error(e));
    }, [setSchedules, schedulesApi]);
    
    return (<table className="table table-hover table-secondary">
        <TableHeader setCreating={setCreating} isCreating={isCreating}/>
        <tbody>
            <tr hidden={!isCreating}>
                <InputScheduleRow  onSave={(s) => On(s).create() } onReturn={() => setCreating(false)}/>
            </tr>
            {schedules.map(s => 
                <ScheduleRow key={s.id} schedule={s} update={(s) => On(s).update()} remove={(s) => On(s).remove()} />)}
        </tbody>        
    </table>);

    function On(schedule: Schedule) {
        if(!schedulesApi) return { create: () => {}, update: () => {}, remove: () => {} };
        const create = () => {
            schedulesApi.create(schedule.name!)
                .then(newS => setSchedules([...schedules, newS]));
        };
        const update = () => {
            schedulesApi.update(schedule)
                .then(newS => setSchedules(schedules.map(s => s.id === schedule.id ? newS : s)))
        };
        const remove = () => {
            schedulesApi.delete(schedule.id!)
                .then(isDeleted => isDeleted ? setSchedules(schedules.filter(s => s.id !== schedule.id)) : {});
        };
        return {create, update, remove};
    }
}