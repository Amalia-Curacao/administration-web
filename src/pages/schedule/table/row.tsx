import { Fragment, ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import SaveButton from "../../../components/saveButton";
import Schedule from "../../../models/Schedule";
import { pages } from "../../../routes";
import References from "../../../tools/References";
import { default as State } from "../../../types/PageState";
import UserRoles from "../../../models/enums/UserRoles";

interface RowProps {
    schedule: Schedule;
    update: (schedule: Schedule) => void;
    remove: (schedule: Schedule) => void;
 }

export function ScheduleRow({schedule, update, remove}: RowProps): ReactElement {    
    console.log(schedule);
    if(!schedule.role) throw Error("schedule.Role is undefined");
    const scheduleRowEdit = <InputScheduleRow 
        schedule={schedule} 
        onReturn={() => updateRow(State.Default)}
        onSave={update}/>;

    const scheduleRowIndex = <ScheduleRowIndex schedule={schedule} role={schedule.role} remove={remove} update={() => updateRow(State.Edit)}/>;
        
    
    const [row, setRow] = useState<ReactElement>(scheduleRowIndex);

    function updateRow(changeTo: State){
        switch (changeTo) {
            case State.Edit:
                setRow(scheduleRowEdit);
                break;
            default:
                setRow(scheduleRowIndex);
                break;
        }
    }
    return row;
}

interface ScheduleRowProps {
    schedule: Schedule;
    role: string;
    update: (schedule: Schedule) => void;
    remove: (schedule: Schedule) => void;
}

function ScheduleRowIndex({schedule, role, remove, update}: ScheduleRowProps): ReactElement { return(<tr>
    <th colSpan={1} scope="col" className="bg-secondary">
        <span className="text-dark">{schedule.id}</span>
    </th>
    <th colSpan={1} scope="col" className="bg-secondary">
        <input type="text" readOnly className="bg-transparent form-control shadow-none border-0" value={!schedule.name ? "" : schedule.name} />
    </th>
    <th colSpan={1} scope="col" className="bg-secondary">
        <span className="text-dark">{role}</span>
    </th>
    <td colSpan={1} className="bg-secondary"> 
        <div className="btn-group float-end">
            <ActionGroup onDelete={() => remove(schedule)} schedule={schedule} onEdit={() => update(schedule)}/>
        </div>
    </td>
</tr>);}

interface InputScheduleRowProps {
    schedule?: Schedule;
    role?: string;
    hidden? : boolean;
    onSave: (s: Schedule) => void;
    onReturn: VoidFunction;
}

export function InputScheduleRow({schedule, role, hidden, onSave, onReturn}: InputScheduleRowProps): ReactElement {
    const references = new References();

    function GetSchedule(): Schedule {
        return {
            id: schedule?.id ?? -1, 
            name: references.GetInput("input").current?.value ?? "", 
            rooms: [], 
            inviteLinks: []
        };
    }

    return(<tr hidden={hidden}>
        <td colSpan={1} className="bg-secondary">
            <span ref={references.GetSpan("id")} className="fw-bold bg-secondary">
                {schedule?.id ?? "~"}
            </span>
        </td>
        <td colSpan={1} className="bg-secondary">
            <input ref={references.GetInput("input")} defaultValue={schedule?.name ?? ""} type="text" className="form-control bg-secondary border-primary"/>
        </td>
        <td colSpan={1} className="bg-secondary">{role ?? ""}</td>
        <td colSpan={1} className="bg-secondary"> 
            <div className="btn-group float-end bg-secondary">
                <SaveButton onSave={() => {onSave(GetSchedule()); return {};}} onReturn={onReturn} />
            </div>
        </td>
    </tr>);
} 

interface ActionGroupProps {
    schedule: Schedule;
    onDelete: VoidFunction;
    onEdit: VoidFunction;
}

function ActionGroup({schedule, onDelete, onEdit}: ActionGroupProps): ReactElement {
    const navigate = useNavigate(); 
    const deleteButtonText = schedule.role === UserRoles.Admin ? "Delete" : "Leave"; 

    return(
        <div className="btn-group">
            <button onClick={() => navigate(pages["role router"].route + "/" + schedule.id)} className="btn btn-outline-primary">Details</button>
            { schedule.role === UserRoles.Owner || schedule.role === UserRoles.Admin ? <button onClick={onEdit} className="btn btn-outline-warning">Edit</button> : <Fragment/> }
            <button onClick={onDelete} className="btn btn-outline-danger">{deleteButtonText}</button>
        </div>);
}