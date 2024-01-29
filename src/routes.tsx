import PageLink from "./types/PageLink";
import { page as SchedulesPage } from "./pages/schedule/main";
import { page as RoomsPage } from "./pages/room/reservations/index";
import { page as HousekeepersPage } from "./pages/housekeeper/index";
import { RouteObject } from "react-router-dom";
import Logo from "./svgs/logo";
import colors from "./scss/colors.module.scss";

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
    "housekeeper index": HousekeepersPage
};

export default function RouteObjects(): RouteObject[] {
    return (Object.values(pages).map(page => {
        return {
            path: page.route + (page.params ?? ""),
            element: page.element,
            replace: true,
        };
    }));
}