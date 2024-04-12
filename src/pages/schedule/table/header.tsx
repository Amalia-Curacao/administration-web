import { ReactElement, useEffect, useRef, useState } from "react";
import ScheduleInviteLinkApi from "../../../api/scheduleInviteLink";
import useAuthentication from "../../../authentication/useAuthentication";

interface TableHeaderProps {
    setCreating: (isCreating: boolean) => void;
    isCreating: boolean;
    isAdmin: boolean;
}

export default function TableHeader({setCreating, isCreating, isAdmin}: TableHeaderProps): ReactElement {

    const extraHeader = isAdmin 
        ? <button hidden={isCreating} onClick={() => setCreating(true)} className="btn btn-outline-success float-end"> Add </button>
        : <InviteHeader/>;

    return (<thead className="h4">
        <tr className="bg-secondary">
            <th className="table-bordered bg-secondary">
                <span className="text-dark">
                    Id
                </span>
            </th>
            <th className="table-bordered bg-secondary">
                <span className="text-dark">
                    Name
                </span>
            </th>
            <th className="table-bordered bg-secondary">
                <span className="text-dark">
                    Role
                </span>
            </th>
            <th className="bg-secondary">
                {extraHeader}
            </th>
        </tr>
    </thead>);
}

function InviteHeader(): ReactElement {
    const { getAccessToken } = useAuthentication();
    const [api, setApi] = useState<ScheduleInviteLinkApi>();
    const inviteLinkCodeInputField = useRef<HTMLInputElement>(null);
    useEffect(() => {
        getAccessToken().then(token => setApi(new ScheduleInviteLinkApi(token)));
    }, [getAccessToken, setApi]);

    return <div className="float-end col d-flex">
        <input className="form-control me-2" ref={inviteLinkCodeInputField} type="text" placeholder="Invite link"/>
        <button className="btn btn-outline-success" onClick={() => {if(api) api.redeem(inviteLinkCodeInputField.current!.value);}}>Submit</button>
    </div>;
}