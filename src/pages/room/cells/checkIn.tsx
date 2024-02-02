import { ReactElement } from "react";
import "../../../scss/room.table.scss";

export function CheckInCell({classModification, children, onClick}: {classModification: string, children?: ReactElement, onClick: VoidFunction}): ReactElement{
    return(<button onClick={onClick} style={{marginLeft: "-50%"}} className={"flex-fill check-in no-decoration" + classModification}>{children}</button>);
}