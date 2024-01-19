import { ReactElement } from "react";
import Schedule from "../../models/Schedule";
import References from "../../tools/References";


const references = new References();

function Action() : Schedule | undefined {
    return({id: -1, name: references.GetInput("name").current?.value ?? "", reservations: [], rooms: []});
}

function Body(): ReactElement {
    return(<>
        <div className="bg-secondary p-0">
            <input ref={references.GetInput("name")} placeholder="Name" type="text" className="form-control bg-secondary border-primary"/>
        </div>
    </>);
}

export default function ScheduleCreate(): {body: ReactElement, action: () => Schedule | undefined} {
    return({body: <Body/>, action: Action});
}