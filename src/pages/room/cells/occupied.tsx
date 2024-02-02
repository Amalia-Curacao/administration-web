import { Fragment, ReactElement } from "react";
import "../../../scss/room.table.scss";

export function OccupiedCell({guestName, classModification, children, onClick}: {guestName: string, classModification: string, children?: ReactElement, onClick: VoidFunction}): ReactElement {
    return(<button onClick={onClick} className={"d-flex flex-fill occupied no-decoration align-items-center" + classModification}>
        { guestName === "" 
        ?   <Fragment/> 
        :   <span className="guest-name">
                {guestName}
            </span>}
            {children}
    </button>);
}