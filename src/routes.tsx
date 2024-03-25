import PageLink from "./types/PageLink";
import { page as SchedulesPage } from "./pages/schedule/page";
import { page as RoomsPage } from "./pages/room/reservations/index";
import { page as HousekeepersPage } from "./pages/housekeeper/index";
import { page as HousekepersTaskPage } from "./pages/room/housekeepingTasks/index";
import Logo from "./svgs/logo";
import colors from "./scss/colors.module.scss";
import { ReactElement } from "react";
import { Route } from "react-router-dom";

export const defaultPage: PageLink = {
    route: "/",
    element: SchedulesPage.element,
    params: SchedulesPage.params,
    icon: <Logo primaryColor={colors.secondary} secondaryColor={colors.secondary} borderColor="none"/>
}

export const pages: { [id: string]: PageLink; } = {
    "default": defaultPage,
    "schedule index": SchedulesPage,
    "room index": RoomsPage,
    "housekeeper index": HousekeepersPage,
    "housekeeping tasks": HousekepersTaskPage
};

export default function Routes(): ReactElement {
    return(<>
        {Object.values(pages).map((page, i) => <Route key={i} path={page.route + (page.params ?? "")} element={page.element}/>)}
    </>);
}