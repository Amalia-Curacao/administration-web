import { ReactElement, useEffect, useRef, useState } from "react";
import UserApi from "../../api/users";
import useAuthentication from "../../authentication/useAuthentication";
import PageLink from "../../types/PageLink";
import { useParams } from "react-router-dom";

function Page(): ReactElement {
    const { scheduleId } = useParams();
    const { getAccessToken } = useAuthentication();
    const [role, setRole] = useState<string>();
    const roleApi = useRef<UserApi>();
    useEffect(() => {
        getAccessToken()
            .then(token => roleApi.current = new UserApi(token))
            .then(() => roleApi.current?.role(Number.parseInt(scheduleId ?? "0")));
    }, [getAccessToken]);

    return <>
        {role}
    </>;
}

export default Page;
export const page: PageLink = {route: "/role", params: "/:scheduleId", element: <Page/>};