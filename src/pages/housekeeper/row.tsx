import { Fragment, ReactElement } from "react";
import User from "../../models/User";
import References from "../../tools/References";

const references = new References();

interface RowProps {
    housekeeper: User,
    style?: { 
        readOnly?: boolean;
        index?: number;
    },
    on(h: User): {
        details: VoidFunction;
        edit: (n: string) => void;
        delete: VoidFunction;
    },
    set(): {
        defaultState: VoidFunction;
        editState: (h: User) => void;
    },
}

const defaultIndex = 0;
const defaultReadOnly = true;
const defaultStyle = {readOnly: defaultReadOnly, index: defaultIndex};


export default function Row({housekeeper, style, on, set}: RowProps): ReactElement {
    let { index, readOnly } = style ??= defaultStyle;
    index ??= defaultIndex;
    readOnly ??= defaultReadOnly;

    return (<tr className={index % 2 === 0 ? " darken " : " lighten "}> { 
        readOnly 
            ? <DisplayRow housekeeper={housekeeper} onDelete={on(housekeeper).delete} onDetails={on(housekeeper).details} onEdit={() => set().editState(housekeeper)}/> 
            : <InputRow housekeeper={housekeeper} onReturn={set().defaultState} onSave={(n) => on(housekeeper).edit(n)}/> 
    }</tr>);
}

interface InputRowProps {
    housekeeper: User;
    onSave: (h: string) => void;
    onReturn: VoidFunction;
}

function InputRow({housekeeper, onSave, onReturn}: InputRowProps): ReactElement {
    return (<>
        <td className="bg-primary">
            <span className="text-secondary">{housekeeper.firstName}</span>
        </td>
        <td className="bg-primary">
            <span className="text-secondary">{housekeeper.lastName}</span>
        </td>
        <td className="bg-primary">
            <textarea className="form-control" ref={references.GetTextArea("note")} defaultValue={housekeeper.note}/>
        </td>
        <td className="bg-primary">
            <div className="btn-group float-end">
                <button className="btn btn-outline-success" onClick={() => onSave(getNotes())}>Save</button>
                <button className="btn btn-outline-warning" onClick={() => onReturn()}>Cancel</button>
            </div>
        </td>
    </>);

    function getNotes(): string {
        return references.GetTextArea("note").current?.value ?? '';
    }
}

interface DisplayRowProps {
    housekeeper: User;
    onDetails: VoidFunction;
    onEdit: VoidFunction;
    onDelete: VoidFunction;
}

function DisplayRow({housekeeper, onEdit, onDelete, onDetails}: DisplayRowProps): ReactElement {
    console.log(housekeeper);
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
        <td className="bg-primary">
            <div className="btn-group float-end">
                <button className="btn btn-outline-primary" onClick={onDetails}>Details</button>
                <button className="btn btn-outline-warning" onClick={onEdit}>Edit</button>
                <button className="btn btn-outline-danger" onClick={onDelete}>Delete</button>
            </div>
        </td>
    </>);

    function Notes({notes, className}: {notes: string, className: string}): ReactElement {
        return (<>{
            notes
                .split("\n")
                .flatMap((note) => note.split("-"))
                .map((note, index) => { 
                    return note === "" 
                        ? <Fragment  key={index}/>
                        :<> <span key={index} className={className}>{"• " + note}</span> <br/> </>})
        }</>);
    }
}