import { ReactElement, useState } from "react";
import Schedule from "../../../models/Schedule";
import TableHeader from "./header";
import { InputScheduleRow, ScheduleRow } from "./row";

interface TableProps {
    schedules: Schedule[];
    On: (s: Schedule) => {create: () => void, update: () => void, remove: () => void};
    isAdmin: boolean;
}

export default function Table({schedules, On, isAdmin} : TableProps): ReactElement {
    const [isCreating, setCreating] = useState<boolean>(false);
    return (<table className="table table-hover table-secondary">
        <TableHeader setCreating={setCreating} isCreating={isCreating} isAdmin={isAdmin}/>
        <tbody>
            <InputScheduleRow hidden={!isCreating} onSave={(s) => On(s).create() } onReturn={() => setCreating(false)}/>
            {schedules.map(s => <ScheduleRow key={s.id} schedule={s} update={(s) => On(s).update()} remove={(s) => On(s).remove()}/>)}
        </tbody>        
    </table>);

    
}