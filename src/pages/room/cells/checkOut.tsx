import { ReactElement } from "react";
import "../../../scss/room.table.scss";

export function CheckOutCell({classModification, children, onClick}: {classModification: string, children?: ReactElement, onClick: VoidFunction}): ReactElement{
    return(<button onClick={onClick} style={{marginRight: "-50%"}} className={"flex-fill check-out no-decoration" + classModification}>{children}</button>);
}