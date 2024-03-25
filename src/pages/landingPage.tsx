import { useAuth0 } from "@auth0/auth0-react";
import { Fragment, ReactElement, useEffect, useRef, useState } from "react";
import LoadingIcon from "../svgs/loading-icon";
import ScheduleInviteLinkApi from "../api/scheduleInviteLink";
import UserApi from "../api/users";


export default function LandingPage(): ReactElement {
    const { isLoading, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    const [accessToken, setToken] = useState<string>();
    useEffect(() => {
        if (isAuthenticated) {
            getAccessTokenSilently().then(token => setToken(token));
        }
    }, [isAuthenticated, getAccessTokenSilently]);

    if (isLoading) {
        return <LoadingIcon/>;        
    } 
    else if (isAuthenticated && accessToken) {
        return <>
            <UserRoles accessToken={accessToken}/>
            <br/>
            <InviteCode accessToken={accessToken} />
            <br/>
            <InputCode accessToken={accessToken} />
        </>;
    }
    else if(!isAuthenticated){
        loginWithRedirect();
    }
    return <Fragment />;
}

function UserRoles({ accessToken }: { accessToken: string }): ReactElement {
    const [roles, setRoles] = useState<string>();
    useEffect(() => {
        const api = new UserApi(accessToken);
        api.role().then(role => setRoles(role));
    }, [accessToken, roles]);
    return <div>{roles}</div>;

}

function InviteCode({ accessToken: token }: { accessToken: string }): ReactElement {
    const [inviteCode, setInviteCode] = useState<string>("");

    useEffect(() => {
        const api = new ScheduleInviteLinkApi(token);
        api.admin().then(code => setInviteCode(code));
    }, [token]);
    
    return <div>{inviteCode}</div>;
}

function InputCode({accessToken}: {accessToken: string}): ReactElement {
    const [api, setApi] = useState<ScheduleInviteLinkApi>();
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
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