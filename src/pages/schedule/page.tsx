import { ReactElement, useEffect, useRef, useState } from "react";
import { GrSchedules } from "react-icons/gr";
import "../../extensions/HTMLElement";
import PageLink from "../../types/PageLink";
import SchedulesApi from "../../api/schedules";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingIcon from "../../svgs/loading-icon";
import Table from "./table/table"
import Schedule from "../../models/Schedule";
import useAuthentication from "../../authentication/useAuthentication";
import UserApi from "../../api/users";
import UserRoles from "../../models/enums/UserRoles";
import { useNavigate } from "react-router-dom";
import ScheduleInviteLinkApi from "../../api/scheduleInviteLink";

const _info = {name: "Schedules", icon: <GrSchedules/>};

function Page(): ReactElement {
    const { isLoading } = useAuth0();
    const { getAccessToken } = useAuthentication();
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const schedulesApi = useRef<SchedulesApi>();
    const scheduleInviteLinkApi = useRef<ScheduleInviteLinkApi>();
    const userApi = useRef<UserApi>();
    const nav = useNavigate();

    useEffect(() => {
        getAccessToken()
            .then(token => {
                schedulesApi.current = new SchedulesApi(token);
                userApi.current = new UserApi(token);
                scheduleInviteLinkApi.current = new ScheduleInviteLinkApi(token);
            })
            .then(() => {
                schedulesApi.current!.get().then(setSchedules);
                userApi.current!.role().then(r => setIsAdmin(r === UserRoles.Admin));
            })
            .catch(e => console.error(e));
    }, [getAccessToken, schedulesApi, userApi]);

    if(isLoading) return <LoadingIcon/>;
    
    return (<div className="p-3 pe-3 d-flex flex-column flex-fill">
        <Table schedules={schedules} On={On} isAdmin={isAdmin}/>
    </div>);

    function On(schedule: Schedule) {
        if(!schedulesApi.current) return { create: () => {}, update: () => {}, remove: () => {} };
        const create = () =>  {
            schedulesApi.current!.create(schedule.name!)
                .then(newS => setSchedules([...schedules, newS]));
        };
        const update = () => {
            schedulesApi.current!.update(schedule).then(() => nav(0));
        };
        const remove = () => {
            if(isAdmin) schedulesApi.current!.delete(schedule.id!)
                .then(isDeleted => isDeleted ? setSchedules(schedules.filter(s => s.id !== schedule.id)) : {});
            else scheduleInviteLinkApi.current!.revoke(schedule.id!)
                .then(isDeleted => isDeleted ? setSchedules(schedules.filter(s => s.id !== schedule.id)) : {});
        };
        return {create, update, remove};

    }
}

export default Page;
export const page: PageLink = {route: "/schedule", element: <Page/>, icon: _info.icon};