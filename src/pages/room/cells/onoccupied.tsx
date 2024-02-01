import { ReactElement } from "react";
import "../../../scss/room.table.scss";

export function OnoccupiedCell({shape, onClick}: {shape: string, onClick: VoidFunction}): ReactElement{
    switch(shape){
        case "L":
            return (<button style={{marginLeft: "-50%"}} className="d-flex flex-fill no-decoration" onClick={onClick}/>);
        case "R":
            return(<button style={{marginRight: "-50%"}} className="d-flex flex-fill no-decoration" onClick={onClick}/>);
        default:
            return(<button className="d-flex flex-fill no-decoration" onClick={onClick}/>);
    }
}