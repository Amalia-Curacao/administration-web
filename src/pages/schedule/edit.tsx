import { ReactElement } from "react";
import Schedule from "../../models/Schedule";
import References from "../../tools/References";

const references = new References();

function EditSchedule({schedule} : {schedule: Schedule}) : ReactElement {
    const { id, name } = schedule;

    return(<>
        <td colSpan={1} className="bg-secondary">
            <span ref={references.GetSpan("id")} className="fw-bold bg-secondary">
                {id}
            </span>
        </td>
        <td colSpan={1} className="bg-secondary">
            <input ref={references.GetInput("input")} defaultValue={name ?? ""} type="text" className="form-control bg-secondary border-primary"/>
        </td>
    </>);
}

function Action(schedule : Schedule) : Schedule | undefined {
    return { 
        id: schedule.id, 
        name: references.GetInput("input").current?.value ?? "", 
        rooms: [], 
        reservations: [],
        housekeepers: [],
        housekeepingTasks: []
    };
}

export default function ScheduleEdit(schedule: Schedule) : {body: ReactElement, action: () => Schedule | undefined} 
{
    if(schedule.id === undefined) throw new Error("Schedule id is not defined");
    return({body: <EditSchedule schedule={schedule}/>, action: () => Action(schedule)});
}