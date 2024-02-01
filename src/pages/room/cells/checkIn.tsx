import { ReactElement } from "react";
import "../../../scss/room.table.scss";

export function CheckInCell({onClick}: {onClick: VoidFunction}): ReactElement{
    return(<button onClick={onClick} style={{marginLeft: "-50%"}} className="flex-fill check-in no-decoration"/>);
}