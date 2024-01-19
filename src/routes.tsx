import PageLink from "./types/PageLink";
import { page as SchedulesPage } from "./pages/schedule/main";
import { page as RoomsPage } from "./pages/room/index";
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