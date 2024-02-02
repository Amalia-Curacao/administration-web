import { ReactElement } from "react";
import "../../../scss/room.table.scss";

export function OnoccupiedCell({shape, classModification, children, onClick}: {shape: string, classModification: string, children?: ReactElement, onClick: VoidFunction}): ReactElement{
    const className = "d-flex flex-fill no-decoration onoccupied" + classModification;
    switch(shape){
        case "L":
            return (<button style={{marginLeft: "-50%"}} className={className} onClick={onClick}>{children}</button>);
        case "R":
            return(<button style={{marginRight: "-50%"}} className={className} onClick={onClick}>{children}</button>);
        default:
            return(<button className={className} onClick={onClick}>{children}</button>);
    }
}