import { Fragment, ReactElement, useEffect, useRef, useState } from "react";
import ScheduleInviteLinkApi from "../../api/scheduleInviteLink";
import UserApi from "../../api/users";
import useAuthentication from "../../authentication/useAuthentication";
import PageLink from "../../types/PageLink";


function Page(): ReactElement {
    const { getAccessToken } = useAuthentication();
    const [role, setRole] = useState<string>();
    const roleApi = useRef<UserApi>();

    useEffect(() => {
        getAccessToken()
            .then(token => roleApi.current = new UserApi(token))
            .then(() => roleApi.current?.role());
    }, [getAccessToken]);

    return <>
    
    </>;
}



export default Page;
export const page: PageLink = {route: "/role", params: "", element: <Page/>};



function UserRoles({ accessToken }: { accessToken: string }): ReactElement {
    const [roles, setRoles] = useState<string>();
    useEffect(() => {
        if(accessToken === "") return;
        const api = new UserApi(accessToken);
        api.role().then(role => setRoles(role));
    }, [accessToken, roles]);
    return <div>{roles}</div>;

}

function InviteCode({ accessToken }: { accessToken: string }): ReactElement {
    const [inviteCode, setInviteCode] = useState<string>("");

    useEffect(() => {
        if(accessToken === "") return;
        const api = new ScheduleInviteLinkApi(accessToken);
        api.admin().then(code => setInviteCode(code));
    }, [accessToken]);
    
    return <div>{inviteCode}</div>;
}

function InputCode({accessToken}: {accessToken: string}): ReactElement {
    const [api, setApi] = useState<ScheduleInviteLinkApi>();
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if(accessToken === "") return;
        setApi(new ScheduleInviteLinkApi(accessToken));
    }, [accessToken, setApi]);


    return <div>
        <input ref={ref} type="text" />
        <button onClick={() => {
            console.log("click");
            const code = ref.current?.value;
            if(code && api) api.redeem(code);
            }}>Submit</button>
    </div>;
}