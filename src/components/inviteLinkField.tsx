import { Fragment, ReactElement } from "react";


interface InviteLinkFieldProps {
    children?: ReactElement;
    inviteLink: string;
    displayText?: string;
}

export default function InviteLinkField({children, inviteLink, displayText}: InviteLinkFieldProps): ReactElement {
    return(<div className="input-group">
        {displayText ? <input className="form-control text-secondary bg-transparent text-center p-2 border-0" defaultValue={displayText} readOnly/> : <Fragment/> }
        <input className="form-control bg-secondary" type="text" value={inviteLink} readOnly/>
        {children ?? <Fragment/>}
    </div>);
}