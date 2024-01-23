import { Fragment, ReactElement, useEffect, useState } from "react";
import Housekeeper from "../../../models/Housekeeper";
import References from "../../../tools/References";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const references = new References();

export default function Row({housekeeper, readOnly, index, onEdit, onSave, onDelete}: {housekeeper: Housekeeper, readOnly: boolean, index: number, onEdit: () => boolean, onSave: (h: Housekeeper) => void, onDelete: (h: Housekeeper) => void}): ReactElement {
    const bgModifier = index % 2 === 0 ? " darken " : " lighten ";    
    const navigate = useNavigate();
    const [actions, setActions] = useState<ReactElement>();
    useEffect(() => {
        if(!readOnly) setActions(<SaveGroup onSave={updateHousekeeper} onReturn={onReturn}/>);
        else setActions(<ActionGroup onEdit={onEdit} onDelete={deleteHousekeeper} onDetails={() => navigate("/housekeepers/tasks/" + housekeeper.id)}/>);

        function deleteHousekeeper(): void {
            axios.delete(process.env.REACT_APP_API_URL + "/Housekeepers/Delete/" + housekeeper.id)
            .then(() => onDelete(housekeeper))
            .catch(error => console.log(error));
        }
    
        function updateHousekeeper(): void {
            const toEdit: Housekeeper = {
                ...housekeeper,
                firstName: references.GetInput("first-name").current?.value,
                lastName: references.GetInput("last-name").current?.value,
                note: references.GetTextArea("note").current?.value
            };
            if(JSON.stringify(housekeeper) !== JSON.stringify(toEdit)) {
                axios.post(process.env.REACT_APP_API_URL + "/Housekeepers/Edit", toEdit)
                    .then(response => onSave(response.data as Housekeeper))
                    .catch(error => console.log(error));
            }
            else {
                onReturn()
            };
        }
    
        function onReturn(): void {
            setActions(<SaveGroup onSave={updateHousekeeper} onReturn={onReturn}/>);
            onSave(housekeeper);
        }
    }, [housekeeper, readOnly, onEdit, onSave, onDelete]);

    return (<tr className={bgModifier}>
        { readOnly ? <ReadonlyFields housekeeper={housekeeper}/> : <InputFields housekeeper={housekeeper}/> }
        <td className="bg-primary">
            {actions}
        </td>
    </tr>);
}

export function CreateRow({scheduleId, onSave, onReturn}: {scheduleId: number, onSave: (h: Housekeeper) => void, onReturn: VoidFunction}): ReactElement {
    const toAdd: Housekeeper = {
        id: -1,
        firstName: "",
        lastName: "",
        note: "",
        scheduleId: scheduleId,
        schedule: undefined,
        tasks: []
    }
    return (<tr>
        <td className="bg-primary">
            <input className="form-control" ref={references.GetInput("first-name")} type="text" defaultValue={toAdd.firstName}/>
        </td>
        <td className="bg-primary">
            <input className="form-control" ref={references.GetInput("last-name")} type="text" defaultValue={toAdd.lastName}/>
        </td>
        <td className="bg-primary">
            <textarea className="form-control" ref={references.GetTextArea("note")} defaultValue={toAdd.note}/>
        </td>
        <td className="bg-primary">
            <SaveGroup onSave={createHousekeeper} onReturn={onReturn}/>
        </td>
    </tr>);

    function createHousekeeper(): void {
        const toCreate: Housekeeper = {
            ...toAdd,
            firstName: references.GetInput("first-name").current?.value,
            lastName: references.GetInput("last-name").current?.value,
            note: references.GetTextArea("note").current?.value
        };
        
        axios.post(process.env.REACT_APP_API_URL + "/Housekeepers/Create", toCreate)
            .then(response => {
                onSave(response.data[0] as Housekeeper)
            })
            .catch(error => console.log(error));
    }
}

function SaveGroup({onSave, onReturn}: {onSave: VoidFunction, onReturn: VoidFunction}): ReactElement {
    return (<div className="btn-group float-end">
        <button className="btn btn-outline-success" onClick={onSave}>Save</button>
        <button className="btn btn-outline-warning" onClick={onReturn}>Cancel</button>
    </div>);
}

function ActionGroup({ onEdit, onDelete, onDetails}: { onEdit: VoidFunction, onDelete: VoidFunction, onDetails: VoidFunction}): ReactElement {
    return (<div className="btn-group float-end">
        <button className="btn btn-outline-primary" onClick={onDetails}>Details</button>
        <button className="btn btn-outline-warning" onClick={onEdit}>Edit</button>
        <button className="btn btn-outline-danger" onClick={onDelete}>Delete</button>
    </div>);
}

function InputFields({housekeeper}: {housekeeper: Housekeeper}): ReactElement {
    return (<>
        <td className="bg-primary darken">
            <input className="form-control" ref={references.GetInput("first-name")} defaultValue={housekeeper.firstName} type="text"/>
        </td>
        <td className="bg-primary">
            <input className="form-control" ref={references.GetInput("last-name")} defaultValue={housekeeper.lastName} type="text"/>
        </td>
        <td className="bg-primary">
            <textarea className="form-control" ref={references.GetTextArea("note")} defaultValue={housekeeper.note}/>
        </td>
    </>);
}

function ReadonlyFields({housekeeper}: {housekeeper: Housekeeper}): ReactElement {
    return (<>
        <td className="bg-primary">
            <span className="text-secondary">{housekeeper.firstName}</span>
        </td>
        <td className="bg-primary">
            <span className="text-secondary">{housekeeper.lastName}</span>
        </td>
        <td className="bg-primary">
            <Notes notes={housekeeper.note ?? ""} className="text-secondary"/>
        </td>
    </>);

    function Notes({notes, className}: {notes: string, className: string}): ReactElement {
        return (<>{
            notes
                .split("\n")
                .flatMap((note) => note.split("-"))
                .map((note, index) => { 
                    if(note === "") return <Fragment/>;
                    return(<> 
                    <span key={index} className={className}>{"• " + note}</span>
                    <br/>
                </>)})
        }</>);
    }
}