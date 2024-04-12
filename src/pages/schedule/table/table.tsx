import { ReactElement } from "react";
import Schedule from "../../../models/Schedule";
import TableHeader from "./header";
import { InputScheduleRow, ScheduleRow } from "./row";

interface TableProps {
    schedules: Schedule[];
    isAdmin: boolean;
    isCreating: boolean;
    On: (s: Schedule) => {create: () => void, update: () => void, remove: () => void};
    Set: () => { create: () => void, default: () => void };
}

export default function Table({schedules, isAdmin, isCreating, On, Set} : TableProps): ReactElement {
    return (<table className="table table-hover table-secondary">
        <TableHeader setCreating={Set().create} isCreating={isCreating} isAdmin={isAdmin}/>
        <tbody>
            <InputScheduleRow hidden={!isCreating} onSave={(s) => On(s).create() } onReturn={Set().default}/>
            {schedules.map(s => <ScheduleRow key={s.id} schedule={s} update={(s) => On(s).update()} remove={(s) => On(s).remove()}/>)}
        </tbody>        
    </table>);
}