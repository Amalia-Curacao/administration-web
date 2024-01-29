import { ReactElement } from "react";
import "../../../scss/room.table.scss";

export function OccupiedCell({guestName, onClick}: {guestName: string, onClick: VoidFunction}): ReactElement {
    return(<button onClick={onClick} className="flex-fill occupied no-decoration">
        <span className="guest-name">
            {guestName}
        </span>
    </button>);
}