import { Fragment, ReactElement, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import User from "../../models/User";
import Row from "./row";
import PageLink from "../../types/PageLink";
import { pages } from "../../routes";
import UserApi from "../../api/users";
import useAuthentication from "../../authentication/useAuthentication";
import HousekeepersApi from "../../api/housekeepers";
import ScheduleInviteLinkApi from "../../api/scheduleInviteLink";
import UserRoles from "../../models/enums/UserRoles";
import InviteLinkField from "../../components/inviteLinkField";

function Body(): ReactElement {
    const {id} = useParams();
    if(!id) throw new Error("Schedule ID is undefined.");
    const scheduleId = parseInt(id!);

    const navigate = useNavigate();
    const { getAccessToken } = useAuthentication();

    const housekeepersApi = useRef<HousekeepersApi>();
    const usersApi = useRef<UserApi>();
    const inviteLinkApi = useRef<ScheduleInviteLinkApi>();

    const [housekeepers, setHousekeepers] = useState<User[]>([]);
    const [editing, setEditing] = useState<User>();
    const [inviteLink, setInviteLink] = useState<string>("");
    
    useEffect(() => {
        getAccessToken().then(token => {
            housekeepersApi.current = new HousekeepersApi(token);
            usersApi.current = new UserApi(token);
            inviteLinkApi.current = new ScheduleInviteLinkApi(token);
        })
            .then(() => {
                housekeepersApi.current!.get(scheduleId).then(setHousekeepers);
                usersApi.current!.role(scheduleId).then(role => role !== UserRoles.Housekeeper ? inviteLinkApi.current!.housekeeper(scheduleId).then(setInviteLink) : {})
            })
            .catch(error => console.log(error));
    }, [getAccessToken, id, scheduleId]);

    return <>
        <div className="d-flex ps-3 d-row bg-primary">
            <h3 className="text-secondary">Housekeepers</h3>
        </div>
        <div className="d-flex">
            <table className="w-100">
                <thead>
                    <tr>
                        <th>
                            <span className="ms-3">
                                First Name
                            </span>
                        </th>
                        <th>
                            <span className="ms-3">
                                Last Name
                            </span>
                        </th>
                        <th>
                            <span className="ms-3">
                                Note
                            </span>
                        </th>
                        <th>
                            <div className="d-flex flex-row float-end pe-3">
                                <InviteLinkField inviteLink={inviteLink} displayText="Housekeeper invite code:">
                                    <button onClick={() => navigate(`${pages["housekeeping tasks"].route}/${id}`)} className="btn btn-outline-warning">
                                        All
                                    </button>
                                </InviteLinkField>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {housekeepers.map((h, index) => !h 
                        ? <Fragment key={index}/> 
                        : <Row key={index} style={{index: index, readOnly: !editing ? true : editing.id !== h.id}} housekeeper={h} set={Set} on={On}/>)}
                </tbody>
            </table>
        </div>
    </>;

    function Set(): { defaultState: VoidFunction, editState: (h: User) => void } {
        return {
            defaultState: () => setEditing(undefined),
            editState: (h: User) => !editing ? setEditing(h) : {}
        }
    }

    function On(h: User): { details: VoidFunction; edit: (n: string) => void; delete: VoidFunction;  } {

        const actions = {
            delete: () => {},
            edit: () => {},
            details: () => navigate(`${pages["housekeeping tasks"].route}/${id}/${h.id}`), 
        };
        if(!housekeepersApi.current || !inviteLinkApi.current) return actions;

        return {
            ...actions,
            delete: () => inviteLinkApi.current!.revoke(scheduleId, h.id!, UserRoles.Housekeeper).then(() => setHousekeepers(housekeepers.filter(u => u.id !== h.id))),
            edit: (n: string) => housekeepersApi.current!.note(h.id!, n, scheduleId).then((note) => setHousekeepers(housekeepers.map(_h => _h.id === h.id ? note : h))).then(() => Set().defaultState())
        }
    }
}

export const page: PageLink = {
    route: "/housekeepers",
    element: <Body/>,
    icon: <Fragment/>,
    params: "/:id",
};