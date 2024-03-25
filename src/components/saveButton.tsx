import { ReactElement } from "react";

interface Props {
    onSave: () => object | undefined,
    onReturn: VoidFunction,
    onFailure?: VoidFunction
}

function SaveButton({onSave, onReturn, onFailure}: Props): ReactElement {
    const onClick = () => {
        if(!onFailure) onFailure = () => {};
        onSave() ? onReturn() : onFailure()
    };
    return (
        <div className="btn-group float-end">
            <button onClick={onReturn} className="btn btn-outline-danger">Back</button>
            <button onClick={onClick} className="btn btn-outline-success">
                Save
            </button>
        </div>);
}

export default SaveButton;