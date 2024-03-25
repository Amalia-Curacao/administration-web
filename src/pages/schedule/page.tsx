import { Fragment, ReactElement, useEffect, useRef } from "react";
import { GrSchedules } from "react-icons/gr";
import "../../extensions/HTMLElement";
import PageLink from "../../types/PageLink";
import PageTitle from "../../components/pageTitle";
import SchedulesApi from "../../api/schedules";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingIcon from "../../svgs/loading-icon";
import Table from "./table/table"

const _info = {name: "Schedules", icon: <GrSchedules/>};

function Page(): ReactElement {
    const { getAccessTokenSilently, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const schedulesApi = useRef<SchedulesApi>();

    useEffect(() => {
        getAccessTokenSilently().then(token => {
            schedulesApi.current = new SchedulesApi(token);
        });
    }, [getAccessTokenSilently, schedulesApi]);

    if(isLoading) return <LoadingIcon/>;
    if(!isAuthenticated) { loginWithRedirect(); return <Fragment/>; };
    
    return (<div className="p-3 pe-3 d-flex flex-column flex-fill">
        <PageTitle name={_info.name} icon={_info.icon}/>
        <Table schedulesApi={schedulesApi.current!}/>
    </div>);
}



export default Page;
export const page: PageLink = {route: "/schedule", element: <Page/>, icon: _info.icon};