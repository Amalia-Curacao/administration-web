import PageLink from "./types/PageLink";
import { link as SchedulesLink } from "./pages/schedule/main";
import { link as RoomsLink } from "./pages/room/index";
import { RouteObject } from "react-router-dom";
import Logo from "./svgs/logo";
import colors from "./scss/colors.module.scss";

export const defaultPage: PageLink = {
    route: "/",
    element: SchedulesLink.element,
    params: SchedulesLink.params,
    icon: <Logo primaryColor={colors.secondary} secondaryColor={colors.secondary} borderColor="none"/>
}


export const pages: { [id: string]: PageLink; } = {
    "default": defaultPage,
    "schedule index": SchedulesLink,
    "room index": RoomsLink,
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