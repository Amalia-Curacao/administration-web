import { ReactElement } from "react";
import Schedule from "../../models/Schedule";

export default function ScheduleIndex({schedule} : {schedule: Schedule}): ReactElement {
    return(<>
        <th colSpan={1} scope="col" className="bg-secondary">
            <span className="text-dark">{schedule.id}</span>
        </th>
        <th colSpan={1} scope="col" className="bg-secondary">
            <input type="text" readOnly className="bg-transparent form-control shadow-none border-0" value={!schedule.name ? "" : schedule.name} />
        </th>
    </>);
}