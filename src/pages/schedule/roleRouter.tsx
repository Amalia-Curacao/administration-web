import { ReactElement, useEffect, useRef, useState } from "react";
import UserApi from "../../api/users";
import useAuthentication from "../../authentication/useAuthentication";
import PageLink from "../../types/PageLink";
import { To, useNavigate, useParams } from "react-router-dom";
import UserRoles from "../../models/enums/UserRoles";
import LoadingIcon from "../../svgs/loading-icon";
import { pages } from "../../routes";

function Page(): ReactElement {
    const { scheduleId } = useParams();
    if(!scheduleId) throw Error("scheduleId is undefined");

    const { getAccessToken } = useAuthentication();
    const nav = useNavigate();
    const [role, setRole] = useState<UserRoles>();
    const roleApi = useRef<UserApi>();

    useEffect(() => {
        getAccessToken()
            .then(token => roleApi.current = new UserApi(token))
            .then(() => roleApi.current?.role(Number.parseInt(scheduleId)).then((r) => {
                if (r === UserRoles.None) roleApi.current?.role().then((r) => setRole(r));
                else setRole(r);
            }));
    }, [getAccessToken, scheduleId]);

    if(!role) return <LoadingIcon/>;
    nav(Router(role, scheduleId), {replace: true});
    return <LoadingIcon/>
}

function Router(role: UserRoles, scheduleId: string) : To {
    switch(role) {
        case UserRoles.Admin: return AdminPage(scheduleId); 
        case UserRoles.Housekeeper: return HousekeepersPage(scheduleId); 
        case UserRoles.Owner: return OwnersPage(scheduleId); 
        case UserRoles.Manager: return ManagerPage(scheduleId); 
        default: throw new Error("Not implemented");
    }
}

function AdminPage(scheduleId: string): string { 
    return `${pages["room index"].route}/${scheduleId}`;
}

function HousekeepersPage(scheduleId: string): string { 
    throw new Error("Not implemented");
    return `${pages["housekeeping tasks"].route}/${scheduleId}`;
}

function OwnersPage(scheduleId: string): string { 
    return `${pages["room index"].route}/${scheduleId}`;
}

function ManagerPage(scheduleId: string): string { 
    return `${pages["room index"].route}/${scheduleId}`;
}

export default Page;
export const page: PageLink = {route: "/role", params: "/:scheduleId", element: <Page/>};