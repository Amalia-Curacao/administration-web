import PageLink from "./types/PageLink";
import { page as SchedulesPage } from "./pages/schedule/page";
import { page as RoomsPage } from "./pages/room/reservations/index";
import { page as HousekeepersPage } from "./pages/housekeeper/index";
import { page as HousekepersTaskPage } from "./pages/room/housekeepingTasks/index";
import Logo from "./svgs/logo";
import colors from "./scss/colors.module.scss";
import { ReactElement } from "react";
import { Route } from "react-router-dom";
import { page as RoleRouter } from "./pages/schedule/roleRouter";
import Layout from "./layout";

export const defaultPage: PageLink = {
    route: "/",
    element: SchedulesPage.element,
    params: "",
    icon: <Logo primaryColor={colors.secondary} secondaryColor={colors.secondary} borderColor="none"/>
}

export const pages: { [id: string]: PageLink; } = {
    "default": defaultPage,
    "role router": RoleRouter,
    "schedule index": SchedulesPage,
    "room index": RoomsPage,
    "housekeeper index": HousekeepersPage,
    "housekeeping tasks": HousekepersTaskPage
};

export default function Routes(): ReactElement {
    return(<>
        {Object.values(pages).map((page, i) => <Route key={i} path={page.route + (page.params ?? "")} element={<Layout>{page.element}</Layout>}/>)}
    </>);
}