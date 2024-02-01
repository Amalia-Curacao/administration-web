import { ReactElement } from "react";
import "../../../scss/room.table.scss";

export function CheckOutCell({onClick}: {onClick: VoidFunction}): ReactElement{
    return(<button onClick={onClick} style={{marginRight: "-50%"}} className="flex-fill check-out no-decoration"/>);
}